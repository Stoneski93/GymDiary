import * as actions from './actionTypes';
import database from '../db';
import { fetchTraining, updateTraining } from './trainings';

function fetchingSet() {
  return {
    type: actions.FETCHING_SET,
  }
}

export function addSet (data) {
  return {
    type: actions.ADD_SET,
    payload: data,
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
  let listSets = [];
  let newSetKey = database.ref().child('/sets').push().key;
  let finallyObject = {
    id: newSetKey,
    weight: weight,
    reps: reps,
  }

  return dispatch => {
    database.ref(`/trainings/${id_tren}/sets`).once('value', (snap) => { listSets = snap.val() })
      .then(
        () => {
          listSets = listSets ? listSets : [];
            listSets.push(newSetKey);
              database.ref(`/sets/${newSetKey}`).update(finallyObject).then(() => {
              dispatch(fetchSet(newSetKey));
              database.ref(`/trainings/${id_tren}/sets`).set(listSets).then(
              () => {
                  database.ref(`/sets`).limitToLast(1).on('child_added', () => { 
                    dispatch(updateTraining(id_tren)); 
                  });
              }
            );
          });
        }
      );
    }
}

export function fetchSets() { 
  return dispatch => {
       database.ref().child('/sets').on('value', snapshot => {
         dispatch(addSets(snapshot.val()));
       });
  }
}

export function fetchSet(set) { 
  return dispatch => {
       database.ref().child(`/sets/${set}`).on('value', snapshot => {
         dispatch(addSet(snapshot.val()));
       });
  }
}