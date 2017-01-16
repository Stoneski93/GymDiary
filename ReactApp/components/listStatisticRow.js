/**
 * List Row
 *
    <ListRow 
      title={title}
      image={entry.entry_image}
      onPress={()=>{alert('Go To Entry View')}} />
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
  Text,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import SetsRow from './setsRow';

import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

//Screen

/* Component ==================================================================== */
class ListStatisticRow extends Component {
  constructor(props) {
    super(props);
  }
/* Render ==================================================================== */
  render() {
    let { id, date, information } = this.props;
      return (
        <TouchableOpacity style={[styles.listRow]}
        activeOpacity={1}>
          <View style={[styles.tableHeader]}>
          <View style={[styles.tableCell]}>
            <Text style={[styles.label]}>{id}</Text>
          </View>
          <View style={[styles.tableCell]}>
            <Text style={[styles.label]}>{date}</Text>
          </View>
          <View style={[styles.tableCell]}>
            <Text style={[styles.label]}>{information}</Text>
          </View>
        </View>
        </TouchableOpacity>
      )
    }
  }

  ListStatisticRow.propTypes = {
  }

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  trainingBar: {
    padding: 5,
    lineHeight: 20,
    borderWidth: 2,
    borderColor: AppConfig.secondaryColor,
    borderRadius: 2,
    backgroundColor: AppConfig.secondaryColor,
    justifyContent: 'flex-start'
  },
  listRow: {
    margin: 2,
  },
  labelContainer: {
    padding: 5,
  },
  tableCell: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    flex: 0.3,
  },
  tableHeader: {
    backgroundColor: 'white',
    borderColor: AppConfig.thirdColor,
    borderWidth: 2,
    flex: 0.2,
    flexDirection: 'row',
  },
  label: {
    color: 'black', 
  }
});

/* Export Component ==================================================================== */
export default connect(null)(ListStatisticRow);

