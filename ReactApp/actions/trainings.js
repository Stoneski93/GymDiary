import * as actions from './actionTypes';
import database from '../db';
import { addSetFb, fetchSet } from './sets';

export function getTraining () { 
  return {
    type: actions.GET_TRAINING,
  } 
}


function addTraining (data) { 
  return {
    type: actions.ADD_TRAINING,
    payload: data,
  } 
}
function addTrainings (data) { 
  return {
    type: actions.ADD_TRAININGS,
    payload: data,
  } 
}

export function editTraining (data) { 
  return {
    type: actions.EDIT_TRAINING,
    payload: data,
  } 
}

export function deleteTraining (data) { 
  return {
    type: actions.DELETE_TRAINING,
    payload: data,
  } 
}

export function addTrainingFb(workout_id, id_exe, set) {
  let listTrainings = [];
  let newTrainingKey = database.ref().child('/trainings').push().key;
  let finallyObject = {
    id: newTrainingKey,
    id_exe: id_exe,
    sets: [],
  }
  
  database.ref(`/workouts/${workout_id}/trainings`).on('value', snap => listTrainings = snap.val());

  listTrainings.push(newTrainingKey);

  database.ref(`/trainings/${newTrainingKey}`).update(finallyObject);
  database.ref(`/workouts/${workout_id}/trainings`).set(listTrainings);

  return dispatch => dispatch(addSetFb(set, newTrainingKey));
}

export function fetchTrainings() { 
  return dispatch => {
       database.ref().child('/trainings').on('value', snapshot => {
         dispatch(addTrainings(snapshot.val()))
       });
  }
}

export function fetchTraining(training) { 
  return dispatch => {
       database.ref().child(`/trainings/${training}`).on('value', snapshot => {
          dispatch(addTraining(snapshot.val()));
          snapshot.val().sets
            .map(set => dispatch(fetchSet(set)));
       });
  }
}