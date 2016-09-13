import * as actions from '../actions/actionTypes';
import moment from 'moment';


const initialState = [];

export default function reducer(state = {currentDate: moment().format()}, action = {}) {
  switch (action.type) {
    case actions.EDIT_DATE:
      Object.assign({}, state, {currentDate: action.payload})
      return state;
    default:
      return state;
  }
}
