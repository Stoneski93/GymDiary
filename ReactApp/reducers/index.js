/**
 * Combine All Reducers
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import { combineReducers } from 'redux'
import auth from './auth';
import workouts from './workouts';
import trainings from './trainings';
import exercises from './exercises';
import records from './records';
import sets from './sets';
import current from './current';
import date from './date';

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
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
  current,
  date
});

// Setup root reducer
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer
