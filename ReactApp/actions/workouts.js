import * as actions from './actionTypes';
import { database } from '../db';
import { fetchTraining, addTrainingFb } from './trainings';
import { setLoading } from './current';

function addWorkout (data) { 
  return {
    type: actions.ADD_WORKOUT,
    payload: data,
  } 
}

export function fetchWorkouts(date) { 
  return dispatch => {
      dispatch(setLoading(true));
      database.ref().child(`/workouts/${date}`).once('value', snapshoot => {
         if(snapshoot.val()) {
          dispatch(addWorkout(snapshoot.val()));
          snapshoot.val().trainings
            .map(training => dispatch(fetchTraining(training)))
          }
       }).then(
            () => { dispatch(setLoading(false)) }
        );
  }
}

export function updateWorkout(date) { 
  return dispatch => {
    database.ref().child(`/workouts/${date}`).once('value', snapshoot => {
      dispatch(addWorkout(snapshoot.val()));
    });
  }
}

export function addWorkoutFb(date, id_exe, set) {
  let newWorkoutKey = date;
  let finallyObject = {
    id: newWorkoutKey,
    data: date,
    trainings: [],
  }
  database.ref().child(`/workouts/${newWorkoutKey}`).set(date); 
  return dispatch => {
    database.ref(`/workouts/${newWorkoutKey}`).update(finallyObject)
      .then(() => {
        dispatch(addTrainingFb(newWorkoutKey, id_exe, set));
      })
  }
} 


