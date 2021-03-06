'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'


/* Navbar Title Component ==================================================================== */
class NavbarTitle extends Component {

  render() {
    return (
      <Text style={[AppStyles.baseText, AppStyles.strong, styles.navbarTitle]}>{this.props.title || 'GymDiary'}</Text>
    );
  }
}

NavbarTitle.propTypes = {
  title: React.PropTypes.string,
}

exports.Title = NavbarTitle;


/* Navbar Left Button Component ==================================================================== */
class NavbarLeftButton extends Component {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.7} 
        style={styles.navbarButton}
        hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
        <Icon name={this.props.icon} size={36} color={AppConfig.secondaryColor} />
      </TouchableOpacity>
    );
  }
}

NavbarLeftButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  icon: React.PropTypes.string.isRequired,
}

exports.LeftButton = NavbarLeftButton;

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  navbarButton: {
    left: 20,
    top: 4,
  },
  navbarTitle: {
    color: AppConfig.primaryColor,
    bottom: 6,
    fontSize: 20,
  },
});
