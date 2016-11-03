import * as actions from './actionTypes';
import database from '../db';

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

export function fetchTrainings() { 
  return dispatch => {
       database.ref().child('/trainings').on('value', snapshot => {
         dispatch(addTrainings(snapshot.val()))
       });
  }
}