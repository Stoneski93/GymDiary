'use strict';

import { combineReducers } from 'redux'
import auth from './auth';
import workouts from './workouts';
import trainings from './trainings';
import exercises from './exercises';
import records from './records';
import history from './history';
import sets from './sets';
import current from './current';
import date from './date';

import sideMenu from './sidemenu'
//Add routes with sceses
import routes from './routes';

// Combine all
const appReducer = combineReducers({
  auth,
  sideMenu,
  routes,
  workouts,
  trainings,
  exercises,
  sets,
  records,
  history,
  current,
  date
});

// Setup root reducer
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state.auth = undefined;
    state.workouts = undefined;
    state.trainings = undefined;
    state.sets = undefined;
    state.records = undefined;
    state.history = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer
