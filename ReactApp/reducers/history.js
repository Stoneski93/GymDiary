import * as actions from '../actions/actionTypes';
import update from 'react-addons-update';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.ADD_HISTORY_WEIGHTS:
      return {...state, ['weights']: {...action.payload}}
    case actions.ADD_HISTORY_WEIGHT:
      return {...state, [action.payload.id_exe]: {...action.payload}};
    case actions.ADD_HISTORY_CALORIES:
     return {...state, ['calories']: {...action.payload}}
    case actions.ADD_HISTORY_CALORIE:
      return {...state, [action.payload.id_exe]: {...action.payload}};
    default:
      return state;
  }
}