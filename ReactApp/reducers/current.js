import * as actions from '../actions/actionTypes';


var initialState = {
  currentExercise: null,
  currentTraining: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_CURRENT_EXERCISE:
      return Object.assign({}, state, {
        currentExercise: action.payload
      });
    case actions.SET_CURRENT_TRAINING:
      return Object.assign({}, state, {
        currentTraining: action.payload
      });
    default:
      return state;
  }
}