import * as actions from './actionTypes';
import { database } from '../db';
import { fetchTraining, addTrainingFb } from './trainings';
import { setLoading } from './current';

export function addWorkout (data) {
  return {
    type: actions.ADD_WORKOUT,
    payload: data,
  } 
}


export function deleteWorkout (id) {
    return {
        type: actions.DELETE_WORKOUT,
        payload: id,
    }
}

export function deleteWorkoutTraining (workoutId, trainingId) {
    return {
        type: actions.DELETE_WORKOUT_TRAINING,
        workoutId: workoutId,
        trainingId: trainingId
    }
}

export function fetchWorkouts(date, uid) {
  return dispatch => {
      dispatch(setLoading(true));
      database.ref().child(`/workouts/${date}-${uid}`).once('value', snapshoot => {
         if(snapshoot.val()) {
          dispatch(addWorkout(snapshoot.val()));
          snapshoot.val().trainings
            .map(training => dispatch(fetchTraining(training)))
          }
       }).then(
            () => { dispatch(setLoading(false)) }
        );
  }
}

export function updateWorkout(date) { 
  return dispatch => {
    database.ref().child(`/workouts/${date}`).once('value', snapshoot => {
      dispatch(addWorkout(snapshoot.val()));
    });
  }
}

export function addWorkoutFb(date, uid, id_exe, set) {
  let newWorkoutKey = `${date}-${uid}`;
  let workout = {
    data: date,
    id: newWorkoutKey,
    trainings: [],
  }
  let oldWorkout = {};
    return dispatch => {
        database.ref().child(`/workouts/${newWorkoutKey}`)
            .once('value', snapshoot => {
                if (snapshoot.val()) {
                    oldWorkout = snapshoot.val();
                    dispatch(addTrainingFb(oldWorkout, id_exe, set, uid));
                } else {
                    database.ref().child(`/workouts/${newWorkoutKey}`).set(date);
                    database.ref(`/workouts/${newWorkoutKey}`).update(workout)
                        .then(() => {
                            dispatch(addTrainingFb(workout, id_exe, set, uid));
                        })
               }
            });
    }

} 


