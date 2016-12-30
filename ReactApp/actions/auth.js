import * as actions from './actionTypes';
import { database, firebaseAuth } from '../db';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { fetchWorkouts } from './workouts';

function userLogin (email, uid) {
    return {
        type: actions.USER_LOGIN,
        payload: email,
        uid: uid
    }
}

function userSignIn () {
    return {
        type: actions.USER_SIGNIN,
    }
}

function userLogout () {
    return {
        type: actions.USER_LOGOUT,
    }
}

function authPlain () {
    return {
        type: actions.AUTH_PLAIN,
    }
}

export function authError (payload) {
    return {
        type: actions.AUTH_ERROR,
        payload
    }
}

export function createUser (email, password) {
  return dispatch => {
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
          let user = {
              email: response.email,
              uid: response.uid,
          }
          dispatch(saveUser(user));
      })
        .then(() => {
            dispatch(loginUser(email, password));
        })
      .catch((error) => {
          dispatch(authError(true));
      });
  }
}

export function logoutUser () {
  return  dispatch => {
      firebaseAuth.signOut()
          .then((response) => {
              AsyncStorage.removeItem('user_data').then(() => {
                dispatch(userLogout());
              });
          })
          .catch((error) => {
              dispatch(authError(true));
          });
  }
}

export function resetPassword (email) {
    return  dispatch => {
        firebaseAuth.sendPasswordResetEmail(email)
            .then((response) => {
                Actions.logIn();
                dispatch(authPlain());
            })
            .catch((error) => {
                dispatch(authError(true));
            });
    }
}

export function loginUser (email, password) {
  return dispatch => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((response) => {
          let uid = response.uid;
          AsyncStorage.setItem('user_data', JSON.stringify({email, password, uid}));
          dispatch(userLogin(email, response.uid));
          Actions.training();
      })
      .catch((error) => {
          dispatch(authError(true));
      });

  }
}

export function saveUser (user) {
  return dispatch => {
      database.ref().child(`/users/${user.uid}`)
          .set({
              email: user.email,
              uid: user.uid,
              workouts: {}
          })
          .then(() => {
              dispatch(userSignIn());
          })
  }
}

export function getAsyncUser (date) {
    return dispatch => {
        AsyncStorage.getItem('user_data').then((user_data_json) => {
            let user_data = JSON.parse(user_data_json);
            dispatch(loginUser(user_data.email, user_data.password));
            dispatch(fetchWorkouts(date, user_data.uid));
        })
            .then(() => Actions.training());
    }
}

export function updateWeight(weight, user_id, currentDate) {
    let user = {};

    return dispatch => {
        database.ref().child(`/users/${user_id}`)
            .once('value', snap => user = snap.val())
                .then(() => {
                    let newKey = `${user_id}_${currentDate}`;
                    let historyWeight = {
                        date: currentDate,
                        weight: weight
                    }
                    user.weight = weight;

                    database.ref().child(`/users/${user_id}`).update(user);
                    database.ref().child(`/weight_history/${user_id}/${currentDate}`).set(historyWeight);
                    dispatch(authPlain());
                })
    }
}
