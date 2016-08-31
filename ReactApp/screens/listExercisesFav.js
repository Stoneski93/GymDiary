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

// Components
import ListRow from '../components/listExercisesRow'

// Demo data
const defaultData = [
  {
    title: 'Żołnierskie',
    favourite: true,
  },
  {
    title: 'Przysiad',
    favourite: true,
  },
  {
    title: 'Wykroki',
    favourite: true,
  },
  {
    title: 'Żołnierskie',
    favourite: true,
  },
];


/* Component ==================================================================== */
class ListExercisesFav extends Component {
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

	componentDidMount = () => {
	  // Fetch Data
    this._fetchData();
	}

  _fetchData = () => {
    this.setState({ isRefreshing: true });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(defaultData),
      isRefreshing: false,
    });
  }

  _renderRow = (data) => {
    let { title, image, favourite } = data;

    return (
      <ListRow {...data} />
    );
  }

  /* Render ==================================================================== */
  render = () => {
    return (
      <View style={[AppStyles.container]}>
        <ListView
          initialListSize={3}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          contentContainerStyle={AppStyles.paddingBottom} 
          style={[styles.listContainer]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._fetchData}
              tintColor={AppConfig.primaryColor} />
          } />
      </View>
    );
  }
}

ListExercisesFav.propTypes = {
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({

});

/* Export Component ==================================================================== */
export default ListExercisesFav