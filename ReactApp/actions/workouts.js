import * as actions from './actionTypes';
import database from '../db';
import { fetchTraining } from './trainings';

function addWorkout (data) { 
  return {
    type: actions.ADD_WORKOUT,
    payload: data,
  } 
}

export function fetchWorkouts(date) { 
  return dispatch => {
       database.ref().child(`/workouts/${date}`).on('value', snapshoot => {
         dispatch(addWorkout(snapshoot.val()));
         snapshoot.val().trainings
             .map(training => dispatch(fetchTraining(training)));
       });
  }
}


