'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

import { Actions } from 'react-native-router-flux';

// Components
import Button from '../components/button';

/* Component ==================================================================== */
class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      splashScreenVisible: this.props.showSplashScreen || false,
    }
  }

  /* Render ==================================================================== */
  render() {
    return (
      <View style={[AppStyles.container, AppStyles.containerStrecht]}>
        <View style={[AppStyles.row, AppStyles.trainingBar, AppStyles.containerCentered]}>
          <Text>26.06.2016</Text>
          <TouchableOpacity activeOpacity={0.7} 
            style={styles.navbarButton}
            hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
            <Icon name='calendar' size={30} color={AppConfig.primaryColor} />
          </TouchableOpacity>
        </View>
        <View style={[AppStyles.container, AppStyles.containerCentered, styles.bulbButtonContainer]}>
          <Button type='bulb' text="+"  onPress={Actions.listview} />
        </View>
      </View>
    );
  }
}

MainScreen.propTypes = {
 //TODO
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