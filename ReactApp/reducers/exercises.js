import * as actions from '../actions/actionTypes';

const initialState = [];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.EXERCISE_TOOGLE_FAVOURITE:
      // TODO concaty 
      return state;
    default:
      return state;
  }
}
