'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  Text,
  TouchableOpacity
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
class weightStatisticScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weightsToTable: [],
      weights: [],
    }
  }
  
  componentWillMount() {
    this.props.fetchHistoryWeightsFb(this.props.user.userId);
  }

  componentWillReceiveProps(nextProps) {
    let chartArray = [];
    let weightsToTable = [];
    let counter = 0;

    if(nextProps.weights) {
      const weightsArray = Object.keys(nextProps.weights).map(function (key) { return nextProps.weights[key]; });

      weightsToTable = weightsArray.map((weight) => {
        let newItem = {
          id: ++counter,
          date: weight.date,
          information: weight.weight
        }
        return newItem;
      })

      counter = 0;

      chartArray = weightsArray.map((weight) => {
        weight.id = counter++
        return weight;
      })

      weightsArray = [];
      weightsArray.push(chartArray);

      this.setState({
        weights: weightsArray,
        weightsToTable: weightsToTable,
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
        { this.state.weights.length ?
          <View style={[styles.wrapper]}>
            <View style={[styles.chartWrapper]}>
              <Text style={[styles.axisY]}>Waga</Text>
              <StockLine data={this.state.weights} options={options} xKey='id' yKey='weight' />
              <Text style={[styles.axisX]}>Data</Text>
            </View>
            <View style={[styles.statisticWrapper]}>
              <ListStatistic stats={this.state.weightsToTable} firstHeader={'Data'} secondHeader={'Waga'} />
            </View>
          </View>
        : null }
        </View>
    );
  }
}

weightStatisticScreen.propTypes = {
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
  }
  
});

function mapStateToProps(state) { 
  return {
    user: state.auth,
    weights: state.history.weights,
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { fetchHistoryWeightsFb, fetchHistoryCaloriesFb })(weightStatisticScreen);