import * as actions from './actionTypes';
import database from '../db';

function addWorkout (data) { 
  return {
    type: actions.ADD_WORKOUT,
    payload: data,
  } 
}

export function fetchWorkouts() { 
  return dispatch => {
       database.ref().child('/workouts').on('value', snapshot => {
         snapshot.val().map(item => dispatch(addWorkout(item)))
       });
  }
}


