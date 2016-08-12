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
import ListRow from '../components/list.row'

// Screens
import Screen from './soon'

// Demo data
const defaultData = [
  {
    title: 'Żołnierskie',
  },
  {
    title: 'Przysiad',
  },
  {
    title: 'Wykroki',
  },
];


/* Component ==================================================================== */
class ListViewExample extends Component {
  static componentName = 'ListViewExample';

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
    * Executes after all modules have been loaded
    */
	componentDidMount = () => {
	  // Fetch Data
    this._fetchData();
	}

  /**
    * Fetch Data from "API" (for Demo Purposes)
    */
  _fetchData = () => {
    this.setState({ isRefreshing: true });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(defaultData),
      isRefreshing: false,
    });
  }

  /**
    * Each Row Item
    */
  _renderRow = (data) => {
    let { title, image } = data;

    return (
      <ListRow title={title.toString()} />
    );
  }

  /**
    * RENDER
    */
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

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listContainer: {
    marginTop: 52,
  }
});

/* Export Component ==================================================================== */
export default ListViewExample