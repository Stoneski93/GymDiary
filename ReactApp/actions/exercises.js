import * as actions from './actionTypes';

export function addExercises (data) { 
  return {
    type: actions.ADD_EXERCISES,
    payload: data,
  } 
}

export function getExercises () { 
  return {
    type: actions.GET_EXERCISES,
  } 
}

export function exerciseToogleFavourite (data) { 
  return {
    type: actions.EXERCISE_TOOGLE_FAVOURITE,
    payload: data,
  } 
}
