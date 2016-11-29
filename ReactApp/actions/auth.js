import * as actions from './actionTypes';
import { database, firebaseAuth } from '../db';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

function userLogin (email) {
    return {
        type: actions.USER_LOGIN,
        payload: email,
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
       //AsyncStorage.setItem('user_data', JSON.stringify(user_data));
          Actions.logIn();
        dispatch(saveUser(user));
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

export function loginUser (email, password) {
  return dispatch => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((response) => {
          Actions.training();
          AsyncStorage.setItem('user_data', JSON.stringify({email, password}));
          dispatch(userLogin(email));
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

export function getAsyncUser () {
    return dispatch => {
        AsyncStorage.getItem('user_data').then((user_data_json) => {
            let user_data = JSON.parse(user_data_json);
            dispatch(loginUser(user_data.email, user_data.password));
        });
    }
}

