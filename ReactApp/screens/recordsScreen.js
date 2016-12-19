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

import { connect } from 'react-redux';
import { exerciseToogleFavourite } from '../actions/exercises';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

// Components
import ListRow from '../components/listRecordsRow'

// Demo data

/* Component ==================================================================== */
class recordsScreen extends Component {
  constructor(props) {
    super(props);

    //initail state
    this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
    }

    this.renderRow = this.renderRow.bind(this);
  }
  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.exercises),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.exercises),
    });
  }

  renderRow(data) {
    // let { title, image, favourite, } = this.props.exercises;

    return (
      <ListRow {...data} />
    );
  }

  /* Render ==================================================================== */
  render() {
    return (
      <View style={[AppStyles.container, styles.pad]}>
        <ListView
          initialListSize={3}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          contentContainerStyle={AppStyles.paddingBottom} 
          style={[styles.listContainer]}
          />
      </View>
    );
  }
}

recordsScreen.propTypes = {
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  pad: {
    paddingTop: 55,
  },
});

function mapStateToProps(state) {
  return { exercises: state.exercises };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { })(recordsScreen);