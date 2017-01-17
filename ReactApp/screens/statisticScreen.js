'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
  Text,
  TouchableOpacity,
  Picker
} from 'react-native'

import { connect } from 'react-redux';
import { fetchHistoryCaloriesFb, fetchHistoryWeightsFb } from '../actions/history';
import { StockLine } from 'react-native-pathjs-charts'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import WeightStatisticScreen from './weightStatisticScreen';
import CaloriesStatisticScreen from './caloriesStatisticScreen';
import RecordsStatisticScreen from './recordsStatisticScreen';

import { Actions } from 'react-native-router-flux';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

// Demo data

/* Component ==================================================================== */
class statisticScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weightsToLabel: {},
      caloriesToLabel: {},
      weights: [],
      calories: [],
    }
  }


  /* Render ==================================================================== */
  render() {
    let options = {
      width: 300,
      height: 250,
      color: '#2980B9',
      margin: {
        top: 0,
        left: 35,
        bottom: 30,
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
        tickValues: [
          // {value:'name1'},
          // {value:'date2'},
          // {value:'cate3'},
          // {value:'name4'},
        ],
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
        <ScrollableTabView style={[styles.top]} renderTabBar={() => <ScrollableTabBar />} >
          <View tabLabel="Waga" style={[AppStyles.container, styles.pad]}>
              <WeightStatisticScreen />
              <TouchableOpacity style={[
                AppStyles.row,
                AppStyles.detailsBar,
                AppStyles.containerCentered,
                AppStyles.customActionBar]}
                onPress={Actions.training}>
                <Text>
                  Powrót
                </Text>
            </TouchableOpacity>
          </View>
          <View tabLabel="Kalorie" style={[AppStyles.container, styles.pad]}>
              <CaloriesStatisticScreen />
              <TouchableOpacity style={[
                AppStyles.row,
                AppStyles.detailsBar,
                AppStyles.containerCentered,
                AppStyles.customActionBar]}
                onPress={Actions.training}>
                <Text>
                  Powrót
                </Text>
            </TouchableOpacity>
          </View>
          <View tabLabel="Rekordy" style={[AppStyles.container, styles.pad]}>
            <RecordsStatisticScreen />
          </View>
        </ScrollableTabView>
    );
  }
}

statisticScreen.propTypes = {
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
  }
});

function mapStateToProps(state) { 
  return {
    user: state.auth,
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { fetchHistoryWeightsFb, fetchHistoryCaloriesFb })(statisticScreen);