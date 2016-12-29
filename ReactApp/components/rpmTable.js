import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

class RPMTable extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    let { first, second, third, rpm } = this.props.week;
    return (
      <View style={[styles.table]}>
        <View style={[styles.tableHeader, styles.tableCell]}>
          <Text style={[styles.label]}>
            {this.props.week.header}
          </Text>
        </View>
        <View style={[styles.tableContent]}>
          <View style={[styles.tableContentRow]}>
            <View style={[styles.tableContentRowTd, styles.tableCell]}>
              <Text>{first * 100}%</Text>
            </View>
            <View style={[styles.tableContentRowTd, styles.tableCell]}>
              <Text>
                {(first * rpm).toFixed(1)}
              </Text>
            </View>
          </View>
           <View style={[styles.tableContentRow]}>
            <View style={[styles.tableContentRowTd, styles.tableCell]}>
              <Text>{second * 100}%</Text>
            </View>
            <View style={[styles.tableContentRowTd, styles.tableCell]}>
              <Text>
                {(second * rpm).toFixed(1)}
              </Text>
            </View>
          </View>
           <View style={[styles.tableContentRow]}>
            <View style={[styles.tableContentRowTd, styles.tableCell]}>
              <Text>{third * 100}%</Text>
            </View>
            <View style={[styles.tableContentRowTd, styles.tableCell]}>
              <Text>
                {(third * rpm).toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: 'yellow',
    marginBottom: 10,
    marginTop: 10,
  },
  tableCell: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: AppConfig.forthColor,
    borderColor: AppConfig.thirdColor,
    borderWidth: 2,
  },
  label: {
    color: AppConfig.thirdColor,
  },
  tableContent: {
    borderWidth: 1,
    borderColor: AppConfig.forthColor,
  },
  tableContentRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableContentRowTd: {
    flex: 0.5,
    backgroundColor: AppConfig.secondaryColor,
    borderWidth: 1,
    borderColor: AppConfig.forthColor,
    
  },
  
});

export default RPMTable;