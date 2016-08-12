/**
 * Menu Contents
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import { Actions } from 'react-native-router-flux';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

// Screens
import StyleGuide from '../screens/style.guide'
import ComingSoon from '../screens/soon'
import FormExample from '../screens/forms'
import ListViewExample from '../screens/listview'
import Exercises from '../screens/exercises'
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
        {title: 'Start', action: Actions.home },
        {title: 'Trening', action: Actions.training },
        {title: 'Ustawienia', action: Actions.userSettings },
        {title: 'List Example', action: Actions.listview, props: {passProps: {noImages: true}}},
        // {title: 'Style Guide', component: StyleGuide},
        //{title: 'Exercises', action: Actions.exercises },
        // {title: 'Forms', component: FormExample},
        // // {title: 'List Example', component: ListViewExample, props: {passProps: {noImages: true}}},
        // {title: 'List Example 2', component: ListViewExample},
      ],
    };
  }

  static propTypes = {
    navigate: React.PropTypes.func.isRequired,
  }

  /**
    * RENDER
    */
  render = () => {
    let { navigate } = this.props;
    let { menu } = this.state;

    // Build the actual Menu Items
    let menuItems = [];
    menu.map((item)=>{
      let { title, component, props, action } = item;

      menuItems.push(
        <TouchableOpacity key={'menu-item-'+title}
          onPress={action}>
          <View style={[styles.menuItem]}>
            <Text style={[AppStyles.baseText, styles.menuItem_text]}>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={[styles.menuContainer]}>
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
  menu: {
    flex: 1,
    left: 0,
    right: 0,
    height: AppConfig.windowHeight,
    backgroundColor: "#dedede",
    padding: 20,
    paddingTop: AppConfig.statusBarHeight,
  },
  menuItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 10,
  },
  menuItem_text: {
    fontSize: 18,
    lineHeight: parseInt(18 + (18 * 0.5)),
    fontWeight: '500',
    marginTop: 10,
    flex: 1,
    color: "#00000"
  },
});

/* Export Component ==================================================================== */
export default Menu