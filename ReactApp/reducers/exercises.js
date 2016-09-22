import * as actions from '../actions/actionTypes';
import exercisesDatabase from '../fdatabase/exercises';

var initialState = exercisesDatabase.exercises;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.EXERCISE_TOOGLE_FAVOURITE:
      return [
        ...state.slice(0, action.payload.id),
        action.payload,
        ...state.slice(action.payload.id + 1)
      ];
    case actions.GET_EXERCISES:
      return state;
    case actions.ADD_EXERCISES:
      return [...state, action.payload];
    default:
      return state;
  }
}