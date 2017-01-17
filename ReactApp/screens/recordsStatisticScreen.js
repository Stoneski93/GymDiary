'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  Text,
  Picker
} from 'react-native'

import { connect } from 'react-redux';
import { fetchHistoryRecordsFb } from '../actions/history';
import { StockLine } from 'react-native-pathjs-charts'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import ListStatistic from '../containers/listStatistic'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

// Demo data

/* Component ==================================================================== */
class recordsStatisticScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentExercise: '',
      currentExerciseId: 0,
      currentRecords: null
    }
  }
  
  componentWillMount() {
    this.props.fetchHistoryRecordsFb(this.props.user.userId);
  }
  
  /* Render ==================================================================== */
  render() {
    let options = {
      width: 300,
      height: 150,
      color: '#2980B9',
      margin: {
        top: 20,
        left: 35,
        bottom: 20,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: false,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    let data = [];
    let recordsToTable = [];
    let counter = 0;

    if(this.state.currentRecords) {
      const newArray = Object.keys(this.state.currentRecords).map((key) => {return this.state.currentRecords[key]});
      
      recordsToTable = newArray.map((record) => {
        let newItem = {
          id: ++counter,
          date: record.date,
          information: record.weight
        }
        return newItem;
      })

      counter = 1;

      const chartArray = newArray.map((record) => {
        return { id: counter++, weight: record.weight };
      })
      
      chartArray.splice(0, 0, {id: 0, weight: 0});
      data.push(chartArray);
    }

    return (
       <View style={[styles.help]}>
          <View style={[styles.wrapper]}>
          {this.props.exercises ?
            <Picker
              prompt="wybierz"
              style={[styles.picker]}
              selectedValue={this.state.currentExercise}
              onValueChange={(currentExercise) => {
                let finded = this.props.exercises.filter((exercise) => exercise.title === currentExercise)
                
                this.setState({
                  currentExercise: currentExercise,
                  currentRecords: this.props.records[finded[0].id],
                  currentExerciseId: finded[0].id
                })
            }
              }
            >
              {this.props.exercises.map((exercise) => {
                return <Picker.Item label={exercise.title} value={exercise.title} />
              })}
            </Picker>
          : null}
          <View style={[styles.chartWrapper]}>
            {data.length
              ? <StockLine data={data} options={options} xKey='id' yKey='weight' />
              : <Text>Brak danych</Text>
            }
          </View>
            {this.state.currentRecords ? 
              <View style={[styles.statisticWrapper]}>
                 <ListStatistic stats={recordsToTable} firstHeader={'Data'} secondHeader={'Cięzar'} />
              </View>
              : 
              <Text>Brak danych</Text>
            }
          </View>

      </View>
    );
  }
}

recordsStatisticScreen.propTypes = {
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  pad: {
    flex: 1,
    felxDirection: 'row',
  },
  top: {
    paddingTop: 60,
  },
  help: {
    //paddingTop: 30,
  },
  picker: {
    
  },
  axisX: {
    position: 'absolute',
    right: 10,
    bottom: -10
  },
  axisY: {
    position: 'absolute',
    left: 10,
    top: -10 
  },
  statisticWrapper: {
    marginTop: 20,
    height: 200,
  }
});

function mapStateToProps(state) { 
  return {
    user: state.auth,
    exercises: state.exercises,
    records: state.history.records
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { fetchHistoryRecordsFb })(recordsStatisticScreen);
