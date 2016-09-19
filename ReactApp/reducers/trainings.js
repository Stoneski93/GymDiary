import * as actions from '../actions/actionTypes';

const initialState = [];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.TRAINING_ADD:
      return Object.assign({}, state, action.payload);
    case actions.TRAINING_EDIT:
      // TODO
      // return Object.assign({}, state, state[action.payload.id] = {action.payload});
    case actions.TRAINING_DELETE:
      // TODO
    default:
      return state;
  }
}
