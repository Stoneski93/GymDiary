'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  Text,
  Picker,
  TouchableOpacity
} from 'react-native'

import { connect } from 'react-redux';
import { fetchHistoryRecordsFb } from '../actions/history';
import { StockLine } from 'react-native-pathjs-charts'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import ListStatistic from '../containers/listStatistic'
import Button from '../components/button';

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
    this.resetState = this.resetState.bind(this);
  }
  
  componentWillMount() {
    this.props.fetchHistoryRecordsFb(this.props.user.userId);
  }

  resetState() {
    this.setState({
      currentExercise: '',
      currentExerciseId: 0,
      currentRecords: null
    })
  }
  
  /* Render ==================================================================== */
  render() {
    let k = 0;

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

    let pickerItems = this.props.exercises;
    

    return (
       <View style={[styles.help]}>
          <View style={[styles.wrapper]}>
          {this.props.exercises ?
            <Picker
              prompt="Ćwiczenie"
              style={[styles.picker]}
              selectedValue={this.state.currentExercise}
              onValueChange={(currentExercise) => {
                let finded = this.props.exercises.filter((exercise) => exercise.title === currentExercise)
                  this.setState({
                    currentExercise: currentExercise,
                    currentRecords: this.props.records[finded[0].id],
                    currentExerciseId: finded[0].id
                  })
                  this.props.fetchHistoryRecordsFb(this.props.user.userId);
            }
              }
            >
              {pickerItems.map((exercise) => {
                return <Picker.Item label={exercise.title} value={exercise.title} />
              })}
            </Picker>
          : null}
          <View>
            <Text style={[styles.attention]}>Przeładuj wykres przed kazdym następnym wyborem</Text>
          </View>
          <View style={[AppStyles.row, styles.reloadButton]}>
              <View style={[AppStyles.flex1]}>
                <Button
                  text={'Przeładuj'}
                  onPress={this.resetState} />
              </View>
            </View>
          <View style={[styles.chartWrapper]}>
            {data.length
              ? <StockLine data={data} options={options} xKey='id' yKey='weight' />
              :
              <View style={[styles.absolute]}>
                <Text style={[styles.info]}>Brak danych</Text>
              </View>
            }
          </View>
            {this.state.currentRecords ? 
              <View style={[styles.statisticWrapper]}>
                 <ListStatistic stats={recordsToTable} firstHeader={'Data'} secondHeader={'Cięzar'} />
              </View>
              : null
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
  reloadButton: {
    padding: 10,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  empty: {
    fontSize: 30,
  },
  attention: {
    color: 'red',
    fontWeight: 'bold',
    paddingLeft: 10,
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
    height: 180,
  },
  info: {
    paddingLeft: 30,
    fontSize: 20
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
