/**
 * Combine All Reducers
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import { combineReducers } from 'redux'
import user from './user';
import trainings from './trainings';
import exercises from './exercises';
import current from './current';
import date from './date';

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import sideMenu from './sidemenu'
//Add routes with sceses
import routes from './routes';

// Combine all
const appReducer = combineReducers({
  sideMenu,
  routes,
  user,
  trainings,
  exercises,
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
