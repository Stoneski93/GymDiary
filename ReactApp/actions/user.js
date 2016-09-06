import * as actions from './actionTypes';

export function addUser (data) {
  return {
    type: actions.USER_ADD,
    payload: data,
  }
}

export function editUser (data) {
  return {
    type: actions.USER_EDIT,
    payload: data,
  }
}
