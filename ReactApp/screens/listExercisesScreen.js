'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  TouchableOpacity,
  Text
} from 'react-native'
import { connect } from 'react-redux';
import database from '../db';
// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

import { Actions } from 'react-native-router-flux';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

// Components
import ListRow from '../components/list.row'

// Screens
import Home from './home'
import ListExercises from './listExercises'
import ListExercisesFav from './listExercisesFav'

/* Component ==================================================================== */
class ListExercisesScreen extends Component {
  constructor(props) {
    super(props);
  }
  /* Render ==================================================================== */
  render() {
    return (
      <View style={[AppStyles.container]}>
        <ScrollableTabView style={{marginTop: 52, }} renderTabBar={() => <ScrollableTabBar />} >
          <ListExercises tabLabel="Cwiczenia" />
          <ListExercisesFav tabLabel="Ulubione" />
        </ScrollableTabView>
        <TouchableOpacity style={[
          AppStyles.row,
          AppStyles.detailsBar,
          AppStyles.containerCentered,
          AppStyles.customActionBar]}
          onPress={Actions.training}>
          <Text>
            Powrót
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ListExercisesScreen.propTypes = {
 //TODO
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  
});

function mapStateToProps(state) {
  return {
    exercises: state.exercises,
  };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, null)(ListExercisesScreen);