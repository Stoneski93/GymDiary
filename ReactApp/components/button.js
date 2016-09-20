
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'


/* Component ==================================================================== */
class Button extends Component {

  static defaultProps = {
    onPress: () => {}, // Do nothing
    type: '',
    text: 'Click Here',
    size: 'medium',
    disabled: false,
  }

  render() {
    let { text, type, onPress, size, disabled } = this.props;

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} disabled={disabled}
        style={[styles.button, type == 'outlined' && styles.buttonOutline, type == 'bulb' && styles.buttonBulb, size == 'small' && styles.buttonSml, size == 'large' && styles.buttonLrg, disabled && styles.disabled]}>
        <Text style={[AppStyles.baseText, styles.button_text, type == 'outlined' && styles.buttonOutline_text, size == 'small' && styles.buttonSml_text, size == 'large' && styles.buttonLrg_text]}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    type: React.PropTypes.oneOf(['', 'outlined']),
    text: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf(['', 'small', 'medium', 'large']),
    disabled: React.PropTypes.bool,
  }

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  // Standard
  button: {
    backgroundColor: AppConfig.forthColor,
    height: 40,
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: AppConfig.thirdColor,

  },
  button_text: {
    color: AppConfig.thirdColor,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: parseInt(20 + (15 * 0.5)),
    fontFamily: AppConfig.baseFont,
    fontWeight: '400',
  },

  // Outlined
  buttonOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: AppConfig.thirdColor,
  },
  buttonOutline_text: {
    color: AppConfig.primaryColor,
  },
  
  buttonBulb: {
    backgroundColor: '#ff5d00',
    height: 45,
    width: 45,
    borderRadius: 100,
    borderColor: '#ff5d00',
  },

  // Large
  buttonLrg: {
    height: 65,
  },
  buttonLrg_text: {
    fontSize: 18,
    lineHeight: parseInt(18 + (18 * 0.5)),
  },

  // Small
  buttonSml: {
    height: 35,
  },
  buttonSml_text: {
    fontSize: 12,
    lineHeight: parseInt(12 + (12 * 0.5)),
  },

  // Disabled
  disabled: {
    opacity: 25,
  },
});


/* Export Component ==================================================================== */
export default Button