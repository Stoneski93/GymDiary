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
    Text
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
   let daily = this.props.dailyTrainings.map(trening => this.props.trainings[trening]);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(daily),
    });
  }
  componentWillReceiveProps(nextProps) {
    let daily = nextProps.dailyTrainings.map(trening => nextProps.trainings[trening]);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(daily),
    });
  }

renderRow(data){
    let {id, id_exe, sets} = data;
    return (
      <ListTrainingRow
        title={this.props.exercises[id_exe].title}
        dailySets={sets}
        //sets={this.props.sets}
        idTraining={id}
        idWorkout={this.props.dailyWorkout.id}
      />
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
  //const trainings = Object.keys(state.trainings).map(function (key) { return state.trainings[key]; });
  return {
     exercises: state.exercises,
  };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps)(ListTrainings);
