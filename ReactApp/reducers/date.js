import * as actions from '../actions/actionTypes';
import moment from 'moment';


export default function reducer(state = moment().format("YYYY-MM-DD"), action = {}) {
  switch (action.type) {
    case actions.EDIT_DATE:
      return action.payload;
    default:
      return state;
  }
}
