'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

import { Actions } from 'react-native-router-flux';
import { setCurrentExercise } from '../actions/current';
import { connect } from 'react-redux';
import { storageImagesRef, storageRef } from '../db.js';

// Components
import Button from '../components/button';

/* Component ==================================================================== */
class ExerciseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      splashScreenVisible: this.props.showSplashScreen || false,
    }
    this.backToExercisesList = this.backToExercisesList.bind(this);
  
  }

  backToExercisesList() {
    //this.props.setCurrentExercise(null);
    Actions.listExercisesScreen();
  }
  /* Render ==================================================================== */
  render() {
    let { title, screenshot, description } = this.props.exercises[this.props.currentExercise];
    return (
      <View style={[AppStyles.container, AppStyles.containerCenteredV]}>
        <View style={[AppStyles.row, AppStyles.detailsBar]}>
          <Text>{title}</Text>
        </View>
        <ScrollView>
          <View style={[styles.imageContainer]}>
            <Image style={[styles.mainImage]}
              source={{ uri: screenshot }}
            />
          </View>
          <View style={[styles.titleContainer]}>
            <Text style={[styles.title]}>Opis ćwiczenia: </Text>
          </View>
          <View style={[styles.imageContainer]}>
            <Text>
              { description }
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
        style={[AppStyles.row,
          AppStyles.detailsBar,
          AppStyles.containerCentered,
          styles.customActionBar]}
        onPress={this.backToExercisesList} >
          <Text>
            Powrót
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ExerciseDetails.propTypes = {
 //TODO
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  navbarButton: {
    position: 'absolute',
    right: 20,
    top: 4,
  },
  customActionBar: {
    position: 'absolute',
    bottom: 0,
  },
  bulbButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  imageContainer: {
    width: 320,
    height: 132,
    marginTop: 20,
    alignItems: 'center'
  },
  titleContainer: {
    width: 320,
    height: 20,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold'
  },
  mainImage: {
    width: 200,
    height: 130,
  },
});

function mapStateToProps(state) {
  return { 
    exercises: state.exercises,
    currentExercise: state.current.currentExercise
     };
}
/* Export Component ==================================================================== */
export default connect(mapStateToProps,{ setCurrentExercise })(ExerciseDetails);
