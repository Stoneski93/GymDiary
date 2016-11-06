import * as actions from './actionTypes';
import { fetchWorkouts } from './workouts';

const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);

function editDate (data) {
  return {
    type: actions.EDIT_DATE,
    payload: data,
  }
}

export function changeDateWithFetch (data) {
  return dispatch => {
    dispatch(fetchWorkouts(data));
      return delay(1000).then(
        () => {
          dispatch(editDate(data));
        }
      )
    }
  }

  export function changeDate(data) {
    return dispatch => {
      dispatch(editDate(data));
    }
  }