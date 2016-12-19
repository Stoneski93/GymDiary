import * as actions from './actionTypes';
import { database } from '../db';
import { addSetFb, fetchSet } from './sets';
import { updateWorkout } from './workouts';
import { setLoading } from './current';

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

export function deleteTraining (id) {
  return {
    type: actions.DELETE_TRAINING,
    payload: id,
  } 
}

export function deleteTrainingSet (trainingId, setId) {
    return {
        type: actions.DELETE_TRAINING_SET,
        trainingId: trainingId,
        setId: setId
    }
}

export function addTrainingFb(workout, id_exe, set, exist = false) {
  let listTrainings = [];
  let newTrainingKey;
  let training = {
    id: exist,
    id_exe: id_exe,
    sets: [],
  }
  let newWorkout = workout;
  
  return dispatch => {
    database.ref(`/workouts/${workout.id}/trainings`)
      .once('value', snap => listTrainings = snap.val())
        .then(() => {
          listTrainings = listTrainings ? listTrainings : [];
            if(!exist) {
                newTrainingKey = database.ref().child('/trainings').push().key;
                listTrainings.push(newTrainingKey);
                training.id = newTrainingKey;
                database.ref(`/trainings/${newTrainingKey}`).update(training);
                database.ref(`/workouts/${workout.id}/trainings`).set(listTrainings)
                    .then(() => {
                        newWorkout.trainings = listTrainings;
                        dispatch(addSetFb(newWorkout, training, set));
                    });
            } else {
                dispatch(addSetFb(newWorkout, training, set));
            }
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
