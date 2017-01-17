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

export function addHistoryCalorie(data) { 
  return {
    type: actions.ADD_HISTORY_CALORIE,
    payload: data,
  } 
}

function addHistoryWeights(data) { 
  return {
    type: actions.ADD_HISTORY_WEIGHTS,
    payload: data,
  } 
}

export function addHistoryWeight(data) { 
  return {
    type: actions.ADD_HISTORY_WEIGHT,
    payload: data,
  } 
}

function addHistoryRecords(data) { 
  return {
    type: actions.ADD_HISTORY_RECORDS,
    payload: data,
  } 
}

export function addHistoryRecord(data) { 
  return {
    type: actions.ADD_HISTORY_RECORD,
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
  return dispatch => {
    database.ref().child(`/weight_history/${uid}`)
      .once('value', (snap) => {
        weights = snap.val()
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

export function fetchHistoryRecordsFb (uid) {
  let calories = {};
  return dispatch => {
    database.ref().child(`/records_history/${uid}`)
      .once('value', (snap) => {
        records = snap.val()
      })
      .then(() => {
        dispatch(addHistoryRecords(records));
      })
  }
}

