import * as actions from './actionTypes';
import database from '../db';
import { addSetFb, fetchSet } from './sets';
import { updateWorkout } from './workouts';

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
  
  return dispatch => {
    database.ref(`/workouts/${workout_id}/trainings`)
      .once('value', snap => listTrainings = snap.val())
        .then(() => {
          listTrainings = listTrainings ? listTrainings : [];
            listTrainings.push(newTrainingKey);
            dispatch(addSetFb(set, newTrainingKey)); 
            database.ref(`/trainings/${newTrainingKey}`).update(finallyObject)
              .then(() => {
                dispatch(updateTraining(newTrainingKey));
                database.ref(`/workouts/${workout_id}/trainings`).set(listTrainings).then(
                  () => {
                    database.ref(`/trainings`).limitToLast(1).on('child_added', () => { 
                      dispatch(updateWorkout(workout_id));
                    });
                  }
                )
              })
      });
    }
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
       database.ref().child(`/trainings/${training}`).once('value', snapshot => {
          dispatch(addTraining(snapshot.val()));
      }).then(
        (snapshot) => { snapshot.val().sets
            .map(set => dispatch(fetchSet(set))); }
      );
  }
}

export function updateTraining(training) { 
  return dispatch => {
       database.ref().child(`/trainings/${training}`).once('value', snapshot => {
          dispatch(addTraining(snapshot.val()));
      });
  }
}
