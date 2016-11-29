import * as actions from './actionTypes';
import { database } from '../db';

function addExercises (data) { 
  return {
    type: actions.ADD_EXERCISES,
    payload: data,
  } 
}

export function fetchExercises() { 
  return dispatch => {
       database.ref().child('/exercises').on('value', snapshot => {
         snapshot.val().map(item => dispatch(addExercises(item)))
       });
  }
}

export function exerciseToogleFavourite (data) { 
  return {
    type: actions.EXERCISE_TOOGLE_FAVOURITE,
    payload: data,
  } 
}

