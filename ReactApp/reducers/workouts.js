import * as actions from '../actions/actionTypes';
import * as workoutsDatabase from '../fdatabase/workouts';

const initialState = workoutsDatabase;
delete initialState.default;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
