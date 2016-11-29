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
    let { title } = this.props; 
      return (
        <TouchableOpacity style={[styles.listRow]} activeOpacity={0.7}>
          <View style={styles.listRowInner}>
            <Text style={[AppStyles.baseText, styles.listRow_text]}>{title.toUpperCase()}</Text>
              <Text style={[AppStyles.baseText, styles.listRow_text, styles.highlightText, styles.record]}>
                <Icon name='trophy' size={20} style={[styles.trophy]} color={'green'} />
                100kg
              </Text>
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
    position: 'relative',
    right: 30,
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
});

/* Export Component ==================================================================== */
export default connect(null,{ setCurrentExercise })(ListExercisesRow);