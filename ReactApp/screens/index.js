
'use strict';

import { combineReducers } from 'redux'
import user from './user';
import trainings from './trainings';
import exercises from './exercises';

import sideMenu from './sidemenu'

import routes from './routes';

// Combine all
const appReducer = combineReducers({
  sideMenu,
  routes,
  user,
  trainings,
  exercises,
});

// Setup root reducer
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer
