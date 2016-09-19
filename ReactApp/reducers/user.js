import * as actions from '../actions/actionTypes';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.USER_ADD:
      return action.payload;
    case actions.USER_EDIT: 
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
