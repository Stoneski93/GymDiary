import * as actions from './actionTypes';

export function editDate (data) {
  return {
    type: actions.EDIT_DATE,
    payload: data,
  }
}
