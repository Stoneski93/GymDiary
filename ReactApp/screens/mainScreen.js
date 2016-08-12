/**
 * Coming Soon
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
  Modal,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

import { Actions } from 'react-native-router-flux';

// Components
import Button from '../components/button'

// Screens
import FirstLoad from './first.load'

/* Component ==================================================================== */
class MainScreen extends Component {
  static componentName = 'MainScreen';

  constructor(props) {
    super(props);

    this.state = {
      splashScreenVisible: this.props.showSplashScreen || false,
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    showSplashScreen: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
  }

  /**
    * Navigates to same scene (for Demo purposes)
    */
  _navigate = (navbarTitle) => {
    this.props.navigator.push({
      title: navbarTitle, 
      component: ComingSoon, 
      index: 2
    });
  }

  /**
    * Splash Screen - Skip
    */
  onSplashSkip = () => {
    this.setState({ splashScreenVisible: false })
  }

  /**
    * RENDER
    */
  render = () => {
    let text = this.props.placeholder || 'Siemano jestem Norbi';
    const text2 = "1.07.2016r";

    // Done
    return (
      <View style={[AppStyles.container, AppStyles.containerStrecht]}>
      <View style={[AppStyles.row, AppStyles.trainingBar, AppStyles.containerCentered]}>
        <Text style={[AppStyles.dateText]}>
          {text2}
        </Text>
        <TouchableOpacity activeOpacity={0.7} 
          style={styles.navbarButton}
          hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
        <Icon name='calendar' size={30} color={AppConfig.primaryColor} />
      </TouchableOpacity>
      </View>
      <View style={[AppStyles.container, AppStyles.containerCentered, styles.bulbButtonContainer]}>
        <Button type='bulb' text="+"  onPress={Actions.listview} />
      </View>
      <Modal animationType={'fade'} 
        transparent={false} 
        visible={this.state.splashScreenVisible}
        onRequestClose={()=>{}}>
        <FirstLoad navigator={this.props.navigator}
          close={this.onSplashSkip} />
      </Modal>
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  navbarButton: {
    position: 'absolute',
    right: 20,
    top: 4,
  },
  bulbButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

/* Export Component ==================================================================== */
export default MainScreen