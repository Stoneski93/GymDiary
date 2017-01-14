'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  RefreshControl,
} from 'react-native'

import { connect } from 'react-redux';
import { fetchHistoryCaloriesFb, fetchHistoryWeightsFb } from '../actions/history';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

// Demo data

/* Component ==================================================================== */
class statisticScreen extends Component {
  constructor(props) {
    super(props);

    this.props.fetchHistoryWeightsFb(this.props.user.userId);
    this.props.fetchHistoryCaloriesFb(this.props.user.userId);
  }

  /* Render ==================================================================== */
  render() {
    return (
        <View style={[AppStyles.container, styles.pad]}>
        
        </View>
    );
  }
}

statisticScreen.propTypes = {
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  pad: {
    paddingTop: 55,
  },
});

function mapStateToProps(state) { 
  return {
    user: state.auth,
    weight_history: state.weight_history,
    calories_history: state.calories_history
  };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { fetchHistoryWeightsFb, fetchHistoryCaloriesFb })(statisticScreen);