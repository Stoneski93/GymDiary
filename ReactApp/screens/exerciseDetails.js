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
    this.getImage = this.getImage.bind(this);
  }

  backToExercisesList() {
    //this.props.setCurrentExercise(null);
    Actions.listExercisesScreen();
  }
  getImage() {
    let ref = storageRef.ref('images/deadlift.png');

    ref.getDownloadURL()
        .then((url) => {
          console.log(url);
        })
        .catch(function(error) {
          // Handle any errors
          console.log(error);
    });
  }

  /* Render ==================================================================== */
  render() {
    let { title, screenshot, description } = this.props.exercises[this.props.currentExercise];
    //let media = 'https://firebasestorage.googleapis.com/v0/b/gymapp-7b1ac.appspot.com/o/images%2Fdeadlift.png?alt=media&token=5ffd72aa-a04a-4981-8fa6-996b78a994b1';
    let temp = this.getImage();

    var imageSource = require(`../images/deadlift.png`);
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
          <View style={[styles.imageContainer]}>
            <Text>{description}</Text>
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
//TODO
//TEXT POWROT 100% OF BUTTON


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
    width: 300,
    height: 200,
    marginTop: 20,
  },
  mainImage: {
    width: 300,
    height: 200,
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
