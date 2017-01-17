'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  Text
} from 'react-native'

import { connect } from 'react-redux';
import { fetchHistoryCaloriesFb, fetchHistoryWeightsFb } from '../actions/history';
import { StockLine } from 'react-native-pathjs-charts'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import ListStatistic from '../containers/listStatistic'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

// Demo data

/* Component ==================================================================== */
class caloriesStatisticScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caloriesToTable: {},
      calories: [],
    }
  }
  
  componentWillMount() {
    this.props.fetchHistoryCaloriesFb(this.props.user.userId);
  }

  componentWillReceiveProps(nextProps) {
    let newArray = [];
    let caloriesToTable = [];
    let counter = 0;

    if(nextProps.calories) {
      const caloriesArray = Object.keys(nextProps.calories).map(function (key) { return nextProps.calories[key]; });

      caloriesToTable = caloriesArray.map((calories) => {
        let newItem = {
          id: ++counter,
          date: calories.date,
          information: calories.calories
        }
         return newItem;
      })

      counter = 0;

      newArray = caloriesArray.map((calories) => {
        calories.id = counter++;
        return calories;
      })

      caloriesArray = [];
      caloriesArray.push(newArray);

      this.setState({
        calories: caloriesArray,
        caloriesToTable: caloriesToTable

      })
    }
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
    return (
       <View style={[styles.help]}>
        { this.state.calories.length ?
          <View style={[styles.wrapper]}>
            <View style={[styles.chartWrapper]}>
              <Text style={[styles.axisY]}>Kalorie</Text>
              <StockLine data={this.state.calories} options={options} xKey='id' yKey='calories' />
              <Text style={[styles.axisX]}>Data</Text>
            </View>
            <View style={[styles.statisticWrapper]}>
              <ListStatistic stats={this.state.caloriesToTable} 
              firstHeader={'Data'} secondHeader={'Kalorie'} />
            </View>
          </View>
        : 
          <View style={[styles.absolute]}>
            <Text style={[styles.attention]}>Brak danych</Text>
          </View>
      }
      </View>
    );
  }
}

caloriesStatisticScreen.propTypes = {
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
    paddingTop: 30,
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
  },
  attention: {
    paddingLeft: 30,
    fontSize: 20
  }
});

function mapStateToProps(state) { 
  return {
    user: state.auth,
    calories: state.history.calories
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { fetchHistoryWeightsFb, fetchHistoryCaloriesFb })(caloriesStatisticScreen);