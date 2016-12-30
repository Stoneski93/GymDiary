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

}

/* Render ==================================================================== */
  render() {
    let { weight, id_exe, date } = this.props.record;
    
      return (
        <TouchableOpacity style={[styles.listRow]} activeOpacity={0.7}>
          <View style={styles.listRowInner}>
            <View style={styles.descWrapper}>
              <Text style={[AppStyles.baseText, styles.listRow_text]}>{this.props.exercises[id_exe].title}</Text>
            </View>
              <Text style={[AppStyles.baseText, styles.listRow_text, styles.highlightText, styles.record]}>
                  { weight } kg
                <Icon name='trophy' size={20} style={[styles.trophy]} color={AppConfig.thirdColor} />
              </Text>
              <View style={styles.descWrapper}>
                <Text style={[styles.listRow_text, styles.dateText]}>Data ustanowienia: {date}</Text>
              </View>
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
    left: 10,
    top: 10,
  },
  trophy: {
    position: 'absolute',
    right: 100,
    top: 10,
    paddingRight: 10,
    
  },
  record: {
    position: 'absolute',
    right: 10,
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
  dateText: {
    fontSize: 10,
    color: AppConfig.forthColor
  },
  listRowImage_text: {
    color: "#FFF",
  },
  highlightText: {
    color: 'green',
  },
  // With Image
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