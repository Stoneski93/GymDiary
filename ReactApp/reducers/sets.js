import * as actions from '../actions/actionTypes';
import update from 'react-addons-update';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.ADD_SET:
      return {...state, [action.set.id]: {...action.set}};
    case actions.DELETE_SET:
      let copyState = Object.assign({}, state); // assuming you use Object.assign() polyfill!
      delete copyState[action.payload.id]; // shallowly mutating a shallow copy is fine
      return copyState;
    case actions.DELETE_WORKOUT_TRAINING_SET:
      let copyState3 = Object.assign({}, state); // assuming you use Object.assign() polyfill!
      delete copyState3[action.setId]; // shallowly mutating a shallow copy is fine
      return copyState3;
    case actions.ADD_SETS:
      return action.payload;
    case actions.DELETE_TRAINING_AND_SET:
      let copiedState2 = Object.assign({}, state); // assuming you use Object.assign() polyfill!
      delete copiedState2[action.setId]; // shallowly mutating a shallow copy is fine
      return copiedState2;
    default:
      return state;
  }
}
