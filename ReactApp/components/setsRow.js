'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native'

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

//Screen

/* Component ==================================================================== */
class SetsRow extends Component {
  constructor(props) {
    super(props);  
    this.goToTrainingScreen = this.goToTrainingScreen.bind(this);

  }

  goToTrainingScreen() {
    //this.props.setCurrentTraining(this.props.id);
    Actions.trainingScreen();
  }

/* Render ==================================================================== */
  render() {
    let { reps, weight } = this.props.sets;
      return (
        <TouchableOpacity style={[styles.listRow]} onPress={this.goToTrainingScreen}
        activeOpacity={0.7}>
          <View style={[AppStyles.row, styles.trainingBar]}>
            <Text style={[styles.label]}>
              Seria: {reps} x {weight} kg
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  SetsRow.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
  }

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  trainingBar: {
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderColor: AppConfig.thirdColor,
    borderRadius: 2,
    backgroundColor: AppConfig.forthColor,
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  listRow: {
    margin: 2,
  },
  label: {
    textAlign: 'right',
    color: AppConfig.thirdColor,
  }
});

/* Export Component ==================================================================== */
export default SetsRow