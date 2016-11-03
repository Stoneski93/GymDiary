import * as actions from './actionTypes';
import database from '../db';

function addSet (data) {
  return {
    // type: actions.ADD_SET,
    // payload: data,
  }
}

function addSets (data) {
  return {
    type: actions.ADD_SETS,
    payload: data,
  }
}

export function addSetFb (set, id_tren) {
  let { weight, reps } = set;
  let list = [];
  let newSetKey = database.ref().child('/sets').push().key;
  
  database.ref(`/trainings/${id_tren}/sets`).on('value', snap => list = snap.val());
  list.push(newSetKey);

  let finallyObject = {
    id: newSetKey,
    weight: weight,
    reps: reps,
  }
  

  database.ref(`/sets/${newSetKey}`).update(finallyObject);
  database.ref(`/trainings/${id_tren}/sets`).set(list);


  return dispatch => dispatch(addSet);

}

export function fetchSets() { 
  return dispatch => {
       database.ref().child('/sets').on('value', snapshot => {
         dispatch(addSets(snapshot.val()));
       });
  }
}