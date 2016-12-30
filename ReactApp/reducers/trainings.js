import { normalize, Schema, arrayOf } from 'normalizr';
import * as actions from '../actions/actionTypes';
import update from 'react-addons-update';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.ADD_TRAINING:
      return {...state, [action.payload.id]: {...action.payload}};
    case actions.ADD_WORKOUT_TRAINING:
      return {...state, [action.training.id]: {...action.training}};
    case actions.ADD_TRAININGS:
      return action.payload;
    case actions.DELETE_TRAINING_SET:
      let copyState = Object.assign({}, state[action.trainingId]);
        let newSets = copyState.sets.filter((set) => set !== action.setId);
        copyState.sets = newSets;
      return {...state, [action.trainingId]: copyState};
    case actions.DELETE_TRAINING:
      let copiedState = Object.assign({}, state); // assuming you use Object.assign() polyfill!
      delete copiedState[action.payload]; // shallowly mutating a shallow copy is fine
      return copiedState;
    case actions.DELETE_WORKOUT_TRAINING_SET:
      let copyState2 = Object.assign({}, state); // assuming you use Object.assign() polyfill!
      delete copyState2[action.trenId]; // shallowly mutating a shallow copy is fine
      return copyState2;
    case actions.DELETE_TRAINING_AND_SET:
      let copiedState2 = Object.assign({}, state); // assuming you use Object.assign() polyfill!
      delete copiedState2[action.trenId]; // shallowly mutating a shallow copy is fine
      return copiedState2;
    default:
      return state;
  }
}
