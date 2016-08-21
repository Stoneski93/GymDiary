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


/* Component ==================================================================== */
class MenuItem extends Component {
  constructor() {
    super();
  }
  /**
    * RENDER
    */
    static propTypes = {
      
    }

  render = () => {
    return (
      <TouchableOpacity key={'menu-item-'+this.props.item.title}
        onPress={this.props.item.action}>
        <View style={[styles.menuItem]}>
            <Icon name={this.props.item.icon} size={20} color={AppConfig.primaryColor} />
            <Text style={[AppStyles.baseText, styles.menuItemText]}>{this.props.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
    height: 48,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 14,
    marginLeft: 15,
    fontWeight: '500',
    color: "#000000"
  },
  image: {
    width: 63,
    height: 63,
    borderRadius: 100,
  }
});

/* Export Component ==================================================================== */
export default MenuItem