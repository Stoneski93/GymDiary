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

import { deleteSetFb } from '../actions/sets';
import { connect } from 'react-redux';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

//Screen

/* Component ==================================================================== */
class SetsRow extends Component {
  constructor(props) {
    super(props);  

    this.removeSet = this.removeSet.bind(this);

  }
  removeSet() {
    this.props.deleteSetFb(this.props.set, this.props.idTraining, this.props.idWorkout);
  }

/* Render ==================================================================== */
  render() {
    let { reps, weight } = this.props.set;
      return (
        <TouchableOpacity style={[styles.listRow]} onPress={this.goToTrainingScreen}
        activeOpacity={0.7}>
          <View style={[AppStyles.row, styles.trainingBar]}>
            <TouchableOpacity
              onPress={this.removeSet}
              activeOpacity={0.7}
              style={styles.navbarButton}
              hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
            <Icon name='trash-o' size={25} color={'#ff2600'} />
            </TouchableOpacity>
            <Text style={[styles.label]}>
              Seria: {reps} powt.  x {weight} kg
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
    position: 'relative',
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
  },
  navbarButton: {
    position: 'absolute',
    left: 10,
    top: 6,
  },
});

function mapStateToProps(state) {
  return {
    workouts: state.workouts,
    trainings: state.trainings,
  };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { deleteSetFb })(SetsRow);

