/**
 * Index - this is where everything
 *  starts - but offloads to app.js
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { Platform } from 'react-native';
import React, { Component } from 'react'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import devTools from 'remote-redux-devtools';

import App from './app'

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '../reducers/index'

// Load middleware
let middleware = [
  thunk,
];

if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware,
    //logger(), // Logs state changes to the dev console
  ];
}

// Init redux store (using the given reducer & middleware)

const enhancer = compose(
    applyMiddleware(thunk),
    global.reduxNativeDevTools ? global.reduxNativeDevTools(/*options*/) : nope => nope,
  );

const store = createStore(rootReducer, enhancer);
  // If you have other enhancers & middlewares
  // update the store after creating / changing to allow devTools to use them
  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }
 

// Wrap App in Redux provider (makes Redux available to all sub-components)
export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
