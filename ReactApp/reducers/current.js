import * as actions from '../actions/actionTypes';

var initialState = {
  currentExercise: null,
  currentTraining: null,
  currnetWorkout: null,
  loading: null,
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
      case actions.SET_CURRENT_WORKOUT:
      return Object.assign({}, state, {
        currentWorkout: action.payload
      });
      case actions.SET_LOADING:
      return Object.assign({}, state, {
        loading: action.payload
      });
    default:
      return state;
  }
}