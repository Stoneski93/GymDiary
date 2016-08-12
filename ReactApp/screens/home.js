/**
 * First Load
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
  StatusBar,
	Image
} from 'react-native'

import { Actions } from 'react-native-router-flux';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

// Components
import Button from '../components/button'

// Screens
import MainScreen from './mainScreen'

/* Component ==================================================================== */
class Home extends Component {
  static componentName = 'Home';

  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    close: React.PropTypes.func.isRequired,
  }

	/**
	  * Navigates to Sign Up
	  */
	_navigate = () => {
    //this.props.close();

	  this.props.navigator.push({
	    title: 'Główna',
	    component: MainScreen, 
	    index: 0,
	  });
	}

  /**
    * RENDER
    */
  render = () => {
    return (
      <View style={[AppStyles.container, styles.containerCover]}>
      	<View style={[AppStyles.paddingHorizontal, AppStyles.containerStrecht]}>
					<View style={[AppStyles.containerCentered]}>
						<Text style={[AppStyles.baseText, styles.mainTitle, AppStyles.centered, styles.headerHeight]}>
							GymDiary
						</Text>
					</View>
					<View style={[AppStyles.paddingVertical]}>
						<Image style={[styles.imageRotate]}
							source={require('../images/2.png')}
						/>
					</View>
					<View style={[AppStyles.row]}>
						<View style={[AppStyles.flex1, AppStyles.paddingHorizontal]}>
							<Button
								text={'Start'}
								onPress={Actions.training} />
						</View>
					</View>
      	</View>
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
	containerCover: {
		backgroundColor: "#FFF",
		justifyContent: 'center',
	},
	mainTitle: {
		fontSize: AppConfig.baseFontSize * 3,
		fontFamily: 'Roboto',
		fontWeight: '300',
	},
	headerHeight: {
		height: 60,
	},
	imageRotate: {
		transform: [{rotate: '-30deg'}],
	}
});

/* Export Component ==================================================================== */
export default Home