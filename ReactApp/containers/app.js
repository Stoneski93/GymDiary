/**
 * App - set all the things up
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
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
//Add with React Native Router
import { Router, Scene } from 'react-native-router-flux';
import { createStore, applyMiddleware, compose } from 'redux';

//NavigationBar and SideMenu
import NavigationBar from 'react-native-navbar'
import SideMenu from 'react-native-side-menu'

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

// Screens
import Home from '../screens/home';
import Main from '../screens/mainScreen.js';
import UserSettings from '../screens/userSettings.js';
import ListExercises from '../screens/listExercises.js';
import TabExercises from '../screens/tabExercises.js';

const RouterWithRedux = connect()(Router);
import reducers from '../reducers';
// other imports...

// create store...
const middleware = [/* ...your middleware (i.e. thunk) */];
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
        <RouterWithRedux navigationBarStyle={styles.customNav} leftButtonStyle={styles.leftButtonStyle} leftButtonIconStyle={styles.barButtonIconStyle}>
          <Scene key="drawer" component={SideDrawer} open={false} >
            <Scene key="first" tabs={true}>
            <Scene key="home" component={Home} initial={true} hideNavBar={true} />
               <Scene key="training" component={Main} hideNavBar={false} title={'Trening'} />            
               <Scene key="userSettings" component={UserSettings} hideNavBar={false} title={'Ustawienia'} />       
               <Scene key="listExercises" component={ListExercises} hideNavBar={false} title={'List View'} />       
               <Scene key="tabExercises" component={TabExercises} hideNavBar={false} title={'List Exercises'} />       
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
	customNav: {
		backgroundColor: "#FFF",
    alignContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
	},
  barButtonIconStyle: {
    tintColor:'#000000',
    width: 18,
  },

});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  sideMenuIsOpen: state.sideMenu.isOpen,
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  toggleSideMenu: SideMenuActions.toggle,
  closeSideMenu: SideMenuActions.close,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
