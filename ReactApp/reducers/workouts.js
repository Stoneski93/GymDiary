import * as actions from '../actions/actionTypes';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.ADD_WORKOUT:
       return {...state, [action.payload.id]: {...action.payload}};
    case actions.ADD_WORKOUT_TRAINING:
      return {...state, [action.workout.id]: {...action.workout}};
    case actions.DELETE_WORKOUT_TRAINING:
      let copyState = Object.assign({}, state[action.workoutId]);
      let newSets = copyState.trainings.filter((training) => training !== action.trainingId);
      copyState.trainings = newSets;
      return {...state, [action.workoutId]: copyState};
    case actions.DELETE_WORKOUT:
      let copiedState = Object.assign({}, state); // assuming you use Object.assign() polyfill!
      delete copiedState[action.payload]; // shallowly mutating a shallow copy is fine
      return copiedState;
    case actions.DELETE_WORKOUT_TRAINING_SET:
      let copyState1 = Object.assign({}, state); // assuming you use Object.assign() polyfill!
      delete copyState1[action.workoutId]; // shallowly mutating a shallow copy is fine
      return copyState1;
    default:
      return state;
  }
}
