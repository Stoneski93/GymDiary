import * as actions from '../actions/actionTypes';
import update from 'react-addons-update';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.ADD_SET:
      return {...state, [action.payload.id]: {...action.payload}};
      // let objdata = {};
      // let id = action.payload.id;
      // objdata[id] = action.payload;
      // return update(state, {$push: { objdata }});
    case actions.ADD_SETS:
      return action.payload;
    default:
      return state;
  }
}
