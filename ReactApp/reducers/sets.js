import * as actions from '../actions/actionTypes';
import * as trainingsDatabase from '../fdatabase/trainings';

var initialState = trainingsDatabase.trainings;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.GET_TRAININGS:
      return state;
    case actions.ADD_TRAINING:
      return [...state,
              state.trainings: [...state.trainings, payload]];
    case actions.EDIT_TRAINING:
      
    case actions.DELETE_TRAINING:
      
    default:
      return state;
  }
}
