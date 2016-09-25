/**
 * List Row
 *
    <ListRow 
      title={title}
      image={entry.entry_image}
      onPress={()=>{alert('Go To Entry View')}} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
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

import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

//Screen

/* Component ==================================================================== */
class ListTrainingRow extends Component {
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
    let { title, weight, reps, onPress } = this.props;
      return (
        <TouchableOpacity style={[styles.listRow]} onPress={this.goToTrainingScreen}
        activeOpacity={0.7}>
          <View style={[AppStyles.row, styles.trainingBar]}>
            <Text style={[]}>
              {title}
            </Text>
            <Text style={[]}>
              {weight}kg x {reps}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  ListTrainingRow.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
  }

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  trainingBar: {
    padding: 20,
    lineHeight: 20,
    height: 60,
    borderBottomWidth: 2,
    borderColor: AppConfig.thirdColor,
    borderRadius: 2,
    backgroundColor: AppConfig.secondaryColor,
    justifyContent: 'space-between'
  },
  listRow: {
    margin: 2,
  }
});

/* Export Component ==================================================================== */
export default ListTrainingRow