import * as actions from '../actions/actionTypes';
import exercisesDatabase from '../fdatabase/exercises';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.EXERCISE_TOOGLE_FAVOURITE:
      return [
        ...state.slice(0, action.payload.id),
        action.payload,
        ...state.slice(action.payload.id + 1)
      ];
    case actions.ADD_EXERCISES:
      return [...state, action.payload];
    default:
      return state;
  }
}