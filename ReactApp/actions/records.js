import * as actions from './actionTypes';
import { database } from '../db';
import { AsyncStorage } from 'react-native';

var exercises = require('../fdatabase/exercises.json');

function addRecords(data) { 
  return {
    type: actions.ADD_RECORDS,
    payload: data,
  } 
}

function addRecord(data) { 
  return {
    type: actions.ADD_RECORD,
    payload: data,
  } 
}

function editRecord(data) {
  return {
    type: actions.EDIT_RECORD,
    payload: data,
  } 
}

export function fetchRecords(id) {
  let records = {};
  return dispatch => {
    database.ref().child(`/records/${id}`)
      .once('value', (snap) => {
        records = snap.val()
      })
      .then(() => {
        dispatch(addRecords(records));
      })
  }
}

export function addRecordFb (record) {
  return (dispatch, getState) => {

    let user = getState().auth;
    let currentDate = getState().date;
    
    let newRecord = {
      id_exe: record.id_exe,
      date: currentDate,
      weight: record.weight
    }
    
    database.ref().child(`/records_history/${user.userId}/${record.id_exe}/${currentDate}`).set(newRecord);
    database.ref().child(`/records/${user.userId}/${newRecord.id_exe}`).set(newRecord)
    dispatch(addRecord(newRecord));

    
          
  }
}