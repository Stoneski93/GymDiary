'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  Text
} from 'react-native'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

/* Component ==================================================================== */
class Loading extends Component {
  render() {
    let { text, transparent } = this.props;

    let colorOfSpinner = "#AAA";
    if (transparent) colorOfSpinner = "#000";

    return (
      <View style={[AppStyles.container, AppStyles.containerCentered, transparent && {backgroundColor: 'rgba(255,255,255,0.75)'} ]}>
        <ActivityIndicator animating={true} size="large"
          color={colorOfSpinner} />

        <View style={[AppStyles.spacer_10]} />

        {text &&
          <Text style={[AppStyles.baseText]}>
            {text}
          </Text>
        }
      </View>
    );
  }
}
Loading.propTypes = {
  text: React.PropTypes.string,
  transparent: React.PropTypes.bool,
}

/* Export Component ==================================================================== */
export default Loading
