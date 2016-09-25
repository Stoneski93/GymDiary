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
  ScrollView,
  RefreshControl,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

// Components
import ListTrainingRow from '../components/listTrainingRow';

/* Component ==================================================================== */
class ListTrainings extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
    }

    this.renderRow = this.renderRow.bind(this);

  }
  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.trainings),
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.trainings),
    });
  }

renderRow(data){
  let {id, id_exe, reps, weight} = data;

    return (
      <ListTrainingRow 
        id={id}
        title={this.props.exercises[id_exe].title}
        reps={reps}
        weight={weight}
        onPress={this.goToTrainingScreen} />
    );
  }

  /* Render ==================================================================== */
  render() {
    return (
       <ScrollView style={[AppStyles.container, styles.listTraining]}>
          <ListView
            initialListSize={3}
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            contentContainerStyle={AppStyles.paddingBottom} 
            style={[styles.listContainer]}
          />
      </ScrollView>
    );
  }
}

ListTrainings.propTypes = {
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listTraining: {
    margin: 5,
    backgroundColor: AppConfig.fifthColor,
    borderBottomWidth: 3,
    borderColor: AppConfig.primaryColor,
    
  },
});

function mapStateToProps(state) {
  return {
     exercises: state.exercises,
  };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps)(ListTrainings);