import * as actions from '../actions/actionTypes';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.ADD_WORKOUT:
      return [...state, action.payload];
    default:
      return state;
  }
}
