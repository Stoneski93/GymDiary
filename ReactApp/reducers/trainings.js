import { normalize, Schema, arrayOf } from 'normalizr';
import * as actions from '../actions/actionTypes';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.ADD_TRAINING:
      return [...state, action.payload];
    case actions.ADD_TRAININGS:
      return action.payload;
    case actions.EDIT_TRAINING:
    case actions.DELETE_TRAINING:
    default:
      return state;
  }
}
