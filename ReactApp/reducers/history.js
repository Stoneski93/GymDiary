import * as actions from '../actions/actionTypes';
import update from 'react-addons-update';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.ADD_HISTORY_WEIGHTS:
      return {...state, ['weights']: {...state.weights, ...action.payload}}
    case actions.ADD_HISTORY_WEIGHT:
      return {...state, ['weights']: {...state.weights, [action.payload.date]: action.payload}};
    case actions.ADD_HISTORY_CALORIES:
     return {...state, ['calories']: {...state.calories, ...action.payload}}
    case actions.ADD_HISTORY_CALORIE:
      return {...state, ['calories']: {...state.calories, [action.payload.date]: action.payload}}
    default:
      return state;
  }
}