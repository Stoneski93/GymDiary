'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
	Image,
	ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { addExercises, fetchExercises } from '../actions/exercises';
import { fetchSets } from '../actions/sets';
import { fetchTrainings } from '../actions/trainings';
import { fetchWorkouts } from '../actions/workouts';
import { getAsyncUser } from '../actions/auth';
// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

// Components
import Button from '../components/button'

// Screens
import MainScreen from './mainScreen'

import Spinner from 'react-native-loading-spinner-overlay';

/* Component ==================================================================== */
class Home extends Component {
  constructor(props) {
		super(props);
		this.goToNextScreen = this.goToNextScreen.bind(this);
		this.props.fetchExercises();
		this.props.fetchWorkouts(this.props.date);
	  	this.props.getAsyncUser();
	}

	goToNextScreen() {
		(!this.props.user) ?
		Actions.logIn() :	Actions.training();
	}

	/* Render ==================================================================== */
  render() {
    return (
      <View style={[
				AppStyles.container,
				AppStyles.containerCentered,
				styles.homeContainer]}>
      	<View style={[AppStyles.containerStrecht]}>
					<View>
						<Text 
							style={[
								AppStyles.baseText, 
								styles.mainTitle,
								AppStyles.centered,
								styles.headerHeight]}>
							GymDiary
						</Text>
					</View>
					<View style={[AppStyles.paddingVertical]}>
						<Image 
							style={[styles.imageRotate]}
							source={require('../images/2.png')}
						/>
					</View>
					<View style={[AppStyles.row]}>
						<View style={[
							AppStyles.flex1,
							AppStyles.paddingHorizontal]}>
							<Button
								text={'Start'}
								onPress={this.goToNextScreen} />
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
	homeContainer: {
		backgroundColor: AppConfig.forthColor,
	},
	back: {
		zIndex: 0,
		position: 'relative',
	},
	mainTitle: {
		fontSize: AppConfig.baseFontSize * 3,
		color: AppConfig.thirdColor,
		fontFamily: 'Roboto',
		fontWeight: '300',
	},
	headerHeight: {
		height: 60,
	},
	imageRotate: {
		transform: [{rotate: '-30deg'}],
	},
});

function mapStateToProps(state) {
  return { 
		user: state.auth.userLogin,
		date: state.date,
		workouts: state.workouts,
		 };
}


/* Export Component ==================================================================== */
export default connect(mapStateToProps,{ addExercises, fetchExercises, fetchSets, fetchWorkouts, fetchTrainings, getAsyncUser })(Home);