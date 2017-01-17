'use strict';
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'

import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

import Button from '../components/button'

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: '',
      timerValue: '',
      started: false,
      button: 'Start'
    }
    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

   componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
    }
  }

  startTimer() {
    if(!this.state.started) {
      this.interval = setInterval(this.tick, 1000);
      this.setState({started: true, button:'Stop'});
    } else {
      clearInterval(this.interval);
      this.setState({started: false, button:'Start'});
    }
  }

  setTimer(value) {
     this.setState({ secondsRemaining: value, timerValue: value});
  }

  resetTimer(value) {
     clearInterval(this.interval);
     this.setState({started: false, secondsRemaining: this.state.timerValue, button:'Start' });
  }

  render() {
    return (
        <View style={[AppStyles.container]}>
          <View style={[AppStyles.containerCentered]}>
            <Text style={[styles.time]}>
              {this.state.secondsRemaining}
            </Text>
          </View>
          <View style={[AppStyles.container,
            AppStyles.containerCentered,
            AppStyles.paddingVerticalSml]}
            >
            <TextInput
              placeholder="Czas"
              style={styles.searchInput}
              value={this.state.timerValue}
              onChangeText={this.setTimer}
              />
              <View style={[AppStyles.row]}>
                <View style={[AppStyles.flex1, styles.searchInput]}>
                  <Button
                  text={this.state.button}
                  onPress={this.startTimer}
                  />
                </View>  
              </View>
              <View style={[AppStyles.row]}>
                <View style={[AppStyles.flex1, styles.searchInput]}>
                  <Button
                  text={'Restart'}
                  onPress={this.resetTimer}
                  />
                </View>  
              </View>
          </View>
        </View>
    );
  }
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  searchInput: {
    paddingLeft: 20,
    width: 200,
    paddingRight: 20,
    fontSize: 19,
    textAlign: 'center'
  },
  time: {
    fontSize: 50,
    color: 'red',
  }
});

export default Timer;