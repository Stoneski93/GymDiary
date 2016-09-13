'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
	Image
} from 'react-native'

import { connect } from 'react-redux';
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
  
	/* Render ==================================================================== */
  render() {
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
								onPress={Actions.userSettings} />
						</View>
					</View>
      	</View>
      </View>
    );
  }
}

Home.propTypes = {
	//TODO
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

function mapStateToProps(state) {
  return { user: state.user };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps)(Home);