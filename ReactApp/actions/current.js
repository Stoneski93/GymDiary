import * as actions from './actionTypes';

export function setCurrentExercise (id) {
  return {
    type: actions.SET_CURRENT_EXERCISE,
    payload: id,
  }
}

export function setCurrentTraining (id) {
  return {
    type: actions.SET_CURRENT_TRAINING,
    payload: id,
  }
}

export function setCurrentWorkout (id) {
  return {
    type: actions.SET_CURRENT_WORKOUT,
    payload: id,
  }
}