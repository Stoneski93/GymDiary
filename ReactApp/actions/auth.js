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
    let user = {};
    return dispatch => {
        firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then((response) => {
            user = {
                email: response.email,
                uid: response.uid,
                password: password,
                weight: 0,
                calories: 0,
            };
            let calories = 0;
            let weight = 0;
            let uid = response.uid;
            AsyncStorage.setItem('user_data', JSON.stringify({email, password, uid, weight, calories}));
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

export function loginUser (user, fromAsync = false) {
    let uid;
    let { email, password, weight, calories } = user;
    return (dispatch, getState) => {
        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then((response) => {
            uid = response.uid;
            if(!fromAsync) {
                AsyncStorage.setItem('user_data', JSON.stringify({email, password, uid, weight, calories}));
            }
        })
        .then(() => {
            let store = getState();
            dispatch(fetchWorkouts(store.date, uid));
        })
        .then(() =>  {
            if(!fromAsync) {
                dispatch(getUser(uid, password));
            } else {
                dispatch(userLogin(user));
            }
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
              workouts: {},
              weight: 0,
              calories: 0,
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
            let fromAsync = true;
            if(user_data) {
                dispatch(loginUser(user_data, fromAsync));
            } 
        })
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

export function getUser(uid, password) {
    return dispatch => {
        database.ref().child(`/users/${uid}`).once('value', snapshot => {
            let { email, uid, weight, calories } = snapshot.val();
            let user = {
                email: email,
                password: password,
                uid: uid,
                weight: weight,
                calories: calories
            }
            AsyncStorage.setItem('user_data', JSON.stringify({email, password, uid, weight, calories}));
            dispatch(userLogin(user));
        }).then(() => {
            dispatch(authPlain());
        });
    }
}