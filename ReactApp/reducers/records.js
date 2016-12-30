import * as actions from '../actions/actionTypes';
import update from 'react-addons-update';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.ADD_RECORDS:
      return action.payload;
    case actions.ADD_RECORD:
      return {...state, [action.payload.id_exe]: {...action.payload}};
    default:
      return state;
  }
}