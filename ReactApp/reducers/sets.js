import * as actions from '../actions/actionTypes';
import * as setsDatabase from '../fdatabase/sets';

var initialState = setsDatabase;
delete initialState.default;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
