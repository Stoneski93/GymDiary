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
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

// Components
import ListStatisticRow from '../components/listStatisticRow';

/* Component ==================================================================== */
class ListStatistic extends Component {
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
   let stats = this.props.stats;

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(stats),
    });
  }
  componentWillReceiveProps(nextProps) {
    let stats = nextProps.stats;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(stats),
    });
  }

renderRow(data){
    let {id, information, date} = data;
    return (
      <ListStatisticRow
        id={id}
        date={date}
        information={information}
      />
    );
  }

  /* Render ==================================================================== */
  render() {
    return (
      <View style={[AppStyles.container]}>
        <View style={[styles.tableHeader]}>
          <View style={[styles.tableCell]}>
            <Text style={[styles.label]}>Lp.</Text>
          </View>
          <View style={[styles.tableCell]}>
            <Text style={[styles.label]}>{this.props.firstHeader}</Text>
          </View>
          <View style={[styles.tableCell]}>
            <Text style={[styles.label]}>{this.props.secondHeader}</Text>
          </View>
        </View>
        <ScrollView style={[styles.listTraining]}>
            <ListView
              initialListSize={3}
              automaticallyAdjustContentInsets={false}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              contentContainerStyle={AppStyles.paddingBottom} 
              style={[styles.listContainer]}
            />  
        </ScrollView>
      </View>
    );
  }
}

ListStatistic.propTypes = {
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listTraining: {
    margin: 5,
    backgroundColor: AppConfig.fifthColor,
    borderBottomWidth: 3,
    borderColor: AppConfig.primaryColor,
  },
  tableCell: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    flex: 0.3,
  },
  tableHeader: {
    backgroundColor: AppConfig.forthColor,
    borderColor: AppConfig.thirdColor,
    borderWidth: 2,
    flex: 0.2,
    flexDirection: 'row',
  },
  label: {
    color: 'white', 
  }
});

function mapStateToProps(state) {
  return {
     
  };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps)(ListStatistic);
