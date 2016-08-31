'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native'

import { connect, Provider } from 'react-redux'
import thunk from 'redux-thunk'

//Add with React Native Router
import { Router, Scene } from 'react-native-router-flux';
import { createStore, applyMiddleware, compose } from 'redux';

// Actions
import * as SideMenuActions from '../actions/sidemenu'

// App Globals
import AppStyles from '../styles';
import AppConfig from '../config';
import AppUtil from '../util';

// Components
import Menu from '../components/menu';
import NavbarElements from '../components/navbar.elements';
import SideDrawer from '../components/drawer';
import NavigationBar from 'react-native-navbar'
import SideMenu from 'react-native-side-menu'

// Screens
import Home from '../screens/home';
import Main from '../screens/mainScreen.js';
import UserSettings from '../screens/userSettings.js';
import ListExercises from '../screens/listExercises.js';
import ListExercisesFav from '../screens/listExercisesFav.js';
import ListExercisesScreen from '../screens/listExercisesScreen.js';

const RouterWithRedux = connect()(Router);
import reducers from '../reducers';
// other imports...

// create store...
const middleware = [thunk];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

/* Component ==================================================================== */
class AppContainer extends Component {
  /**
    * RENDER
    */
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux navigationBarStyle={AppStyles.navigationBarStyle} leftButtonStyle={AppStyles.leftButtonStyle} leftButtonIconStyle={AppStyles.barButtonIconStyle}>
          <Scene key="drawer" component={SideDrawer} open={false} >
            <Scene key="first" tabs={true}>
            <Scene key="home" component={Home} initial={true} hideNavBar={true} />
               <Scene key="training" component={Main} hideNavBar={false} title={'Trening'} />            
               <Scene key="userSettings" component={UserSettings} hideNavBar={false} title={'Ustawienia'} />       
               <Scene key="listExercises" component={ListExercises} hideNavBar={false} title={'Wszystkie Ćwiczenia'} />       
               <Scene key="listExercisesFav" component={ListExercisesFav} hideNavBar={false} title={'Ulubione Ćwiczenia'} />       
               <Scene key="listExercisesScreen" component={ListExercisesScreen} hideNavBar={false} title={'Lista Ćwiczeń'} />       
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  //TODO
});

const mapDispatchToProps = {
 //TODO
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
