'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

import { Actions } from 'react-native-router-flux';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

// Components
import MenuItem from './menuItem'

// Screens
import ListExercisesScreen from '../screens/listExercisesScreen'
import Home from '../screens/home'
import MainScreen from '../screens/mainScreen'
import UserSettings from '../screens/userSettings'


/* Component ==================================================================== */
class Menu extends Component {
  constructor() {
    super();

    // Initial state
    this.state = {
      menu: [
        {title: 'Start', action: Actions.home, icon: 'home' },
        {title: 'Trening', action: Actions.training, icon: 'clock-o' },
        {title: 'Ustawienia', action: Actions.userSettings, icon: 'cog' },
        {title: 'Lista Ćwiczeń', action: Actions.listExercisesScreen, props: {passProps: {noImages: true}}, icon: 'list-ul'},
      ],
    };
  }
  
  /* Styles ==================================================================== */
  render() {
    let { navigate } = this.props;
    let { menu } = this.state;

    // Build the actual Menu Items
    let menuItems = [];

    menu.map((item)=>{
      menuItems.push(
        <MenuItem item={item} />
      );
    });

    return (
      <View style={[styles.menuContainer]}>
        <View style={[styles.header]}>
          <View style={[styles.headerBoxAvatar]}>
            <View style={[styles.headerAvatar]}>
              <Image style={[styles.avatar]}
							source={require('../images/10.jpg')}
						  />
            </View>
          </View>
          <View style={[styles.headerBoxSubtitle]}>
            <Text style={[styles.mainSubtitleText]}>Jan Kowalski</Text>
            <Text style={[styles.secondarySubtitleText]}>jan@kowalski.pl</Text>
          </View>
        </View>
        <View style={[styles.menu]}>{menuItems}</View>
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    left: 0,
    right: 0,
    backgroundColor: "#111111",
  },
  header: {
    height: 148,
    backgroundColor: 'transparent',
    paddingBottom: 8,
  },
  headerBoxAvatar: {
    height: 84,
    padding: 15,
    backgroundColor: '#000000',
  },
  headerAvatar: {
    height: 63,
    width: 63,
    borderRadius: 100,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  headerBoxSubtitle: {
    height: 56,
    padding: 15,
    backgroundColor: '#000000',
  },
  mainSubtitleText: {
    fontSize: 14,
    color: "#FFF",
  },
  secondarySubtitleText: {
    fonrSize: 13,
    color: "#FFF",
  },
  menu: {
    flex: 1,
    left: 0,
    right: 0,
    height: AppConfig.windowHeight,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: '#000000',
    paddingTop: 8,
  },
  avatar: {
    width: 63,
    height: 63,
    borderRadius: 100,
  }
});

/* Export Component ==================================================================== */
export default Menu