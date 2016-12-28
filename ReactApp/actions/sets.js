import * as actions from './actionTypes';
import { database } from '../db';
import { fetchTraining, updateTraining, addTraining, deleteTrainingSet, deleteTraining } from './trainings';
import { deleteWorkoutTraining, addWorkout, deleteWorkout, fetchWorkouts } from './workouts';

export function addSet (set) {
  return {
    type: actions.ADD_SET,
    set
  }
}

export function addWorkoutTraining (workout, training) {
    return {
        type: actions.ADD_WORKOUT_TRAINING,
        workout,
        training
    }
}

export function addWorkoutTrainingSet (workout, training, set) {
    console.log(workout);
    console.log(training);
    console.log(set);
    return dispatch => {
        Promise.resolve(dispatch(addSet(set)))
            .then(() => {
                console.log('jestem');
                dispatch(addWorkoutTraining(workout, training))});
        // Promise.all([dispatch(addWorkoutTraining(workout, training)), dispatch(addSet(set))])
        //     .then(console.log('hehe'));
    }
    //TODO
}

export function deleteSet (data) {
    return {
        type: actions.DELETE_SET,
        payload: data,
    }
}

function deleteTrainingAndSet (id_tren, id_set) {
    return {
        type: actions.DELETE_TRAINING_AND_SET,
        trenId: id_tren,
        setId: id_set,
    }
}

export function addSetFb (workout, training, set, uid) {
    let {weight, reps} = set;
    let listSets = [];
    let newSetKey = database.ref().child('/sets').push().key;
    let newSet = {
        id: newSetKey,
        weight: weight,
        reps: reps,
    }
    let newTraining = training;

    return dispatch => {
        database.ref(`/trainings/${training.id}/sets`).once('value', (snap) => {
            listSets = snap.val()
        })
            .then(() => {
                listSets = listSets ? listSets : [];
                listSets.push(newSetKey);
                database.ref(`/sets/${newSetKey}`).update(newSet)
                    .then(() => {
                        newTraining.sets = listSets;
                        console.log(newTraining.sets);
                        database.ref(`/trainings/${training.id}/sets`).set(listSets)
                            .then(() => {
                                dispatch(addWorkoutTrainingSet(workout, newTraining, newSet));
                            });
                    });

                //Promise.resolve(dispatch(addWorkoutTrainingSet(workout, newTraining, newSet)))
                // Promise.resolve([
                //     dispatch(addWorkout(workout)),
                //         dispatch(addTraining(training))
                //     ])
                //     .then(() => dispatch(addSet(newSet)));
            });
    }
}
export function deleteSetFb(set, id_tren, id_workout) {
    let listSets = [];
    let listTrainings = [];
    let id_set = set.id;
    return dispatch => {
        database.ref().child(`/trainings/${id_tren}`).once('value', snapshot => {
            let training = snapshot.val();
            listSets = training.sets;
            listSets = listSets.filter(setSnap => setSnap !== id_set);

            if(listSets.length === 0) {
                database.ref().child(`/workouts/${id_workout}`).once('value', snapshot => {
                    let workout = snapshot.val();
                    listTrainings = workout.trainings;
                    listTrainings = listTrainings.filter(trainingSnap => trainingSnap !== id_tren);

                    if(listTrainings.length === 0) {
                        database.ref(`/workouts`).child(`/${id_workout}`).remove()
                            .then(() => {
                                database.ref(`/trainings`).child(`/${id_tren}`).remove();
                            })
                                .then(() => {
                                    database.ref(`/sets`).child(`/${id_set}`).remove();
                                });
                        Promise.resolve(dispatch(deleteWorkoutTrainingSet(id_workout, id_tren, id_set)));
                    } else {
                        database.ref().child(`/workouts/${id_workout}/trainings`).set(listTrainings)
                            .then(() => {
                                database.ref(`/trainings`).child(`/${id_tren}`).remove()
                                    .then(() => database.ref(`/sets`).child(`/${id_set}`).remove())
                            })
                        Promise.resolve(dispatch(deleteWorkoutTraining(id_workout, id_tren)))
                             .then(() => dispatch(deleteTrainingAndSet(id_tren, id_set)));
                    }
                });
            } else {
                Promise.resolve(dispatch(deleteTrainingSet(id_tren, id_set)))
                    .then(() => {
                        Promise.resolve(dispatch(deleteSet(set)))
                            .then(() => {
                                database.ref().child(`/trainings/${id_tren}/sets`).set(listSets);
                            })
                            .then(() => database.ref(`/sets`).child(`/${id_set}`).remove());
                    })
            }
        })
    }
}

export function fetchSet(set) { 
  return dispatch => {
       database.ref().child(`/sets/${set}`).once('value', snapshot => {
         dispatch(addSet(snapshot.val()));
       });
  }
}

export function deleteWorkoutTrainingSet(id_workout, id_tren, id_set) {
    return {
        type: actions.DELETE_WORKOUT_TRAINING_SET,
        setId: id_set,
        trenId: id_tren,
        workoutId: id_workout,
    }

}