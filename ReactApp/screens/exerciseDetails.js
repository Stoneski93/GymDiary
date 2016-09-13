'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

import { Actions } from 'react-native-router-flux';

// Components
import Button from '../components/button';

/* Component ==================================================================== */
class ExerciseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      splashScreenVisible: this.props.showSplashScreen || false,
    }
  }

  /* Render ==================================================================== */
  render() {
    return (
      <View style={[AppStyles.container, AppStyles.containerCenteredV]}>
        <View style={[AppStyles.row, AppStyles.detailsBar, AppStyles.containerCentered]}>
          <Text>Martwy Ciąg</Text>
        </View>
        <View style={[styles.imageContainer]}>
          <Image style={[styles.mainImage]}
            source={require('../images/deadlift.png')}
					/>
        </View>
        <View style={[styles.imageContainer]}>
          <Text>
            Martwy ciąg wykonuje się
            podnosząc sztangę z ziemi do momentu, 
            w którym plecy i nogi ćwiczącego są całkowicie wyprostowane, 
            barki odciągnięte do tyłu, a sztanga z 
            ciężarami znajduje się nieco poniżej bioder. 
            Należy stanąć jak najbliżej sztangi, tak aby oglądany z
            góry gryf znajdował się w połowie długości stopy. 
            Nogi powinny być ustawione w niewielkim rozkroku (technika klasyczna) lub szeroko (sumo).
          </Text>
        </View>
        <View style={[AppStyles.row, AppStyles.detailsBar, AppStyles.containerCentered, styles.customActionBar]}       
        >
          <Text onPress={Actions.listExercisesScreen}>
            Powrót
          </Text>
        </View>
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

/* Export Component ==================================================================== */
export default ExerciseDetails