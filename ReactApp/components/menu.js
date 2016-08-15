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
  TouchableOpacity,
  Image
} from 'react-native'

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';

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
        {title: 'Start', action: Actions.home, icon: 'home' },
        {title: 'Trening', action: Actions.training, icon: 'clock-o' },
        {title: 'Ustawienia', action: Actions.userSettings, icon: 'cog' },
        {title: 'List Example', action: Actions.listview, props: {passProps: {noImages: true}}, icon: 'list-ul'},
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
      let { title, component, props, action, icon } = item;

      menuItems.push(
        <TouchableOpacity key={'menu-item-'+title}
          onPress={action}>
          <View style={[styles.menuItem]}>
             <Icon name={icon} size={20} color={AppConfig.primaryColor} />
             <Text style={[AppStyles.baseText, styles.menuItem_text]}>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <View style={[styles.menuContainer]}>
        <View style={[styles.header]}>
          <View style={[styles.headerBoxAvatar]}>
            <View style={[styles.headerAvatar]}>
              <Image style={[styles.image]}
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
  menuItem: {
    flex: 1,
    height: 48,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem_text: {
    fontSize: 14,
    marginLeft: 15,
    //lineHeight: parseInt(48),
    fontWeight: '500',
    // marginTop: 10,
    // flex: 1,
    color: "#000000"
  },
  image: {
    width: 63,
    height: 63,
    borderRadius: 100,
  }
});

/* Export Component ==================================================================== */
export default Menu