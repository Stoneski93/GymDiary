import * as actions from './actionTypes';
import { database, firebaseAuth } from '../db';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { fetchWorkouts } from './workouts';
import { fetchRecords } from './records';

function userLogin (user) {
    return {
        type: actions.USER_LOGIN,
        payload: user,
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

function addWeight (weight) {
    return {
        type: actions.ADD_WEIGHT,
        payload: weight
    }
}
function addCalories (calories) {
    return {
        type: actions.ADD_CALORIES,
        payload: calories
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
          let uid = response.uid;
          AsyncStorage.setItem('user_data', JSON.stringify({email, password, uid}));
          dispatch(saveUser(user));
      })
        .then(() => {
            dispatch(loginUser(user));
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

export function loginUser (user) {
    //console.log(user);
  return dispatch => {
    firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((response) => {
          let uid = response.uid;
          //AsyncStorage.setItem('user_data', JSON.stringify({email, password, uid}));
          dispatch(userLogin(user));
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
            dispatch(loginUser(user_data));
        })
            .then(() => Actions.training());
    }
}

export function updateWeight(weight) {
    return (dispatch, getState) => {
        let store = getState();
        let user = store.auth;
        let currentDate = store.date;
        
        let newUser = {
            uid: user.userId,
            weight: weight
        }
         let historyWeight = {
             date: currentDate,
             weight: weight
        }

        database.ref().child(`/users/${user.userId}`).update(newUser);
        database.ref().child(`/weight_history/${user.userId}/${currentDate}`).set(historyWeight);

        AsyncStorage.mergeItem('user_data', JSON.stringify(newUser));

        dispatch(addWeight(weight));
    }
}

export function updateCalories(calories) {
    return (dispatch, getState) => {
        let store = getState();
        let user = store.auth;
        let currentDate = store.date;
        
        let newUser = {
            uid: user.userId,
            calories: calories
        }
         let historyCalories = {
             date: currentDate,
             calories: calories
        }

        database.ref().child(`/users/${user.userId}`).update(newUser);
        database.ref().child(`/calories_history/${user.userId}/${currentDate}`).set(historyCalories);

        AsyncStorage.mergeItem('user_data', JSON.stringify(newUser));

        dispatch(addCalories(calories));
    }
}
