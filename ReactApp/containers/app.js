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
import { Router, Scene, Actions } from 'react-native-router-flux';
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
import SignIn from '../screens/signIn.js';
import LogIn from '../screens/logIn.js';
import RemindPassword from '../screens/remindPassword.js';
import LogoutScreen from '../screens/logoutScreen.js';
import ListExercises from '../screens/listExercises.js';
import ListExercisesFav from '../screens/listExercisesFav.js';
import ListExercisesScreen from '../screens/listExercisesScreen.js';
import exerciseDetailsScreen from '../screens/exerciseDetails.js';
import trainingScreen from '../screens/training.js';
import recordsScreen from '../screens/recordsScreen.js';
import statisticScreen from '../screens/statisticScreen.js';
import RPMScreen from '../screens/RPMScreen.js';

const RouterWithRedux = connect()(Router);
import reducers from '../reducers';
// other imports...

/* Component ==================================================================== */
class AppContainer extends Component {
  /**
    * RENDER
    */
  render() {
    return (
      <RouterWithRedux 
        navigationBarStyle={AppStyles.navigationBarStyle} 
        leftButtonStyle={AppStyles.leftButtonStyle} 
        leftButtonIconStyle={AppStyles.barButtonIconStyle}>
        <Scene key="drawer" component={SideDrawer} open={false} >
          <Scene key="first" tabs={true}>
          <Scene key="home" component={Home} initial={true}
          hideNavBar={true} />
            <Scene key="training" component={Main}
            hideNavBar={false}
              title={'Trening'} />
            <Scene key="logIn" component={LogIn}
            hideNavBar={true}
            title={'Zaloguj się'} />       
            <Scene key="signIn" component={SignIn}
            hideNavBar={true}
            title={'Zarejestruj się'} />       
            <Scene key="remindPassword" component={RemindPassword}
            hideNavBar={true}
            title={'Przypomnij hasło'} />
            <Scene key="logoutScreen" component={LogoutScreen}
            hideNavBar={false}
            title={'Wyloguj się'} />
            <Scene key="userSettings" component={UserSettings}
            hideNavBar={false}
            title={'Ustawienia'} />
            <Scene key="listExercises" component={ListExercises}
            hideNavBar={false}
            title={'Wszystkie Ćwiczenia'} /> 
            <Scene key="listExercisesFav" component={ListExercisesFav}
            hideNavBar={false}
            title={'Ulubione Ćwiczenia'} />       
            <Scene key="listExercisesScreen" component={ListExercisesScreen}
            hideNavBar={false}
            title={'Lista Ćwiczeń'} />       
            <Scene key="exerciseDetailsScreen" component={exerciseDetailsScreen}
            hideNavBar={false}
            title={'Szczegóły Ćwiczenia'}
              onLeft={Actions.listExercises} />
            <Scene key="recordsScreen" component={recordsScreen}
            hideNavBar={false}
            title={'Rekordy'}
            onLeft={Actions.Main} />
            <Scene key="statisticScreen" component={statisticScreen}
            hideNavBar={false}
            title={'Statystyki'}
            onLeft={Actions.Main} />          
            <Scene key="RPMScreen" component={RPMScreen}
            hideNavBar={false}
            title={'RPM'}
            onLeft={Actions.Main} />         
            <Scene key="trainingScreen" component={trainingScreen}
            hideNavBar={false}
            title={'Ćwicz'}
            onLeft={Actions.listExercises} />         
          </Scene>
        </Scene>
      </RouterWithRedux>
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
