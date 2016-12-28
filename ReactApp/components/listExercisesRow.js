'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

import { Actions } from 'react-native-router-flux';
import { setCurrentExercise } from '../actions/current';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

//Screen

/* Component ==================================================================== */
class ListExercisesRow extends Component {
constructor(props) {
  super(props);

  this.toogleFavourite = this.toogleFavourite.bind(this);
  this.goToDetails = this.goToDetails.bind(this);
  this.goToTraining = this.goToTraining.bind(this);
}

toogleFavourite() {
  const obj = {
    'id': this.props.id,
    'title': this.props.title,
    'screenshot': this.props.screenshots,
    'description': this.props.description,
    'favourite': !this.props.favourite,
  }
  this.props.onStarPress(obj);
}
goToTraining() {
  this.props.setCurrentExercise(this.props.id);
  Actions.trainingScreen();
}
goToDetails() {
  this.props.setCurrentExercise(this.props.id);
  Actions.exerciseDetailsScreen();
}
/* Render ==================================================================== */
  render() {
    let { title, image, onPress, favourite } = this.props; 
      return (
        <TouchableOpacity style={[styles.listRow]} onPress={this.goToTraining} activeOpacity={0.7}>
          <View style={styles.listRowInner}>
            <View style={styles.descWrapper}>
              <Text
              ellipsizeMode='tail' 
              style={[AppStyles.baseText, styles.listRow_text]}>{title.toUpperCase()}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} 
              style={styles.infoButton}
              onPress={this.goToDetails}
              hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
              <Icon name='info-circle' size={20} color={AppConfig.primaryColor} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} 
              style={styles.starButton}
              onPress={this.toogleFavourite}
              hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
              <Icon name='star' size={20} color={favourite ? '#ffe500' : AppConfig.primaryColor} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    }
  }

  ListExercisesRow.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
  }

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listRow: {
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
  },
  navbarButton: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  starButton: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  infoButton: {
    position: 'absolute',
    right: 60,
    top: 10,
  },
  listRowInner: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppConfig.borderColor,
  },
  listRow_text: {
    color: AppConfig.textColor,
    textAlign: 'left',
    marginLeft: 20,
    fontWeight: '400',
    backgroundColor: 'transparent',
  },
  listRowImage_text: {
    color: "#FFF",
  },
  imageBackground: {
    backgroundColor: "#333",
  },
  imageBackground_image: {
    height: AppConfig.windowHeight / 4,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  },
  descWrapper: {
    paddingRight: 100,
  }
});

/* Export Component ==================================================================== */
export default connect(null,{ setCurrentExercise })(ListExercisesRow);