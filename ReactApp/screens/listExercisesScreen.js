'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
} from 'react-native'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

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

/* Export Component ==================================================================== */
export default ListExercisesScreen