/**
 * Listing SCREEN
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



/* Component ==================================================================== */
class TabsExercises extends Component {
  static componentName = 'tabsExercises';

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      isRefreshing: false,
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
  }

  /**
    * RENDER
    */
  render = () => {
    return (
      <View style={[AppStyles.container]}>
        <ScrollableTabView style={{marginTop: 52, }} renderTabBar={() => <ScrollableTabBar />} >
          <ListExercises tabLabel="Cwiczenia" />
          <ListExercises tabLabel="Ulubione" />
        </ScrollableTabView>
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listContainer: {
    // marginTop: 52,
  }
});

/* Export Component ==================================================================== */
export default TabsExercises