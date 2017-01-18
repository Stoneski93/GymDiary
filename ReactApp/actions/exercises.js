import * as actions from './actionTypes';
import { database } from '../db';
import { AsyncStorage } from 'react-native';

var exercises = require('../fdatabase/exercises.json');

function addExercises (data) { 
  return {
    type: actions.ADD_EXERCISES,
    payload: data,
  } 
}

export function fetchExercises() {
  let pairs = [];
  
  return dispatch => {
    AsyncStorage.getItem('0')
    .then(value => {
      if(value !== null) {
        dispatch(addAsyncExercises())
      } else {
        Promise.resolve(exercises.map(
        (exercise) => {
          let obj = [""+exercise.id, JSON.stringify(exercise)];
        pairs.push(obj);
      }))
        .then(() => {
            AsyncStorage.multiSet(pairs)
              .then(dispatch(addAsyncExercises()));
        }); 
      }
    });
  }
}

export function addAsyncExercises () { 
  let asyncExercises = [];
  let i = 0;
  return dispatch => {
    for(i=0; i<43; i++) {
     AsyncStorage.getItem(""+i)
      .then((value) => dispatch(addExercises(JSON.parse(value))))
    }
  }
}

export function exerciseToogleFavourite (data) { 
  return dispatch => {
    AsyncStorage.setItem(""+data.id, JSON.stringify(data))
      .then(dispatch({
        type: actions.EXERCISE_TOOGLE_FAVOURITE,
        payload: data
      }));
  }
}
