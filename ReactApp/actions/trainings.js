import * as actions from './actionTypes';


export function getTrainings () { 
  return {
    type: actions.GET_TRAININGS,
  } 
}

export function getTraining () { 
  return {
    type: actions.GET_TRAINING,
  } 
}

export function addTraining (data) { 
  return {
    type: actions.ADD_TRAINING,
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

