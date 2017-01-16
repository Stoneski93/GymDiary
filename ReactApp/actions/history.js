import * as actions from './actionTypes';
import { database } from '../db';
import { AsyncStorage } from 'react-native';

var exercises = require('../fdatabase/exercises.json');

function addHistoryCalories(data) { 
  return {
    type: actions.ADD_HISTORY_CALORIES,
    payload: data,
  } 
}

function addHistoryWeights(data) { 
  return {
    type: actions.ADD_HISTORY_WEIGHTS,
    payload: data,
  } 
}

function editRecord(data) {
  return {
    type: actions.EDIT_RECORD,
    payload: data,
  } 
}

export function fetchHistoryWeightsFb (uid) {
  let weights = {};
  console.log('jestem');
  return dispatch => {
    database.ref().child(`/weight_history/${uid}`)
      .once('value', (snap) => {
        weights = snap.val()
        console.log(weights);
      })
      .then(() => {
        dispatch(addHistoryWeights(weights));
      })
  }
}

export function fetchHistoryCaloriesFb (uid) {
  let calories = {};
  return dispatch => {
    database.ref().child(`/calories_history/${uid}`)
      .once('value', (snap) => {
        calories = snap.val()
      })
      .then(() => {
        dispatch(addHistoryCalories(calories));
      })
  }
}