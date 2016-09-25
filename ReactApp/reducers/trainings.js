import * as actions from '../actions/actionTypes';
import * as trainingsDatabase from '../fdatabase/trainings';

var initialState = trainingsDatabase.trainings;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.GET_TRAININGS:
      return state;
    case actions.ADD_TRAINING:
      return [...state, action.payload];
    case actions.EDIT_TRAINING:
      return [
        ...state.slice(0, action.payload.id),
        action.payload,
        ...state.slice(action.payload.id + 1)
      ];
    case actions.DELETE_TRAINING:
      return [
        ...state.slice(0, action.payload.id),
        ...state.slice(action.payload.id + 1)
      ];
    default:
      return state;
  }
}
