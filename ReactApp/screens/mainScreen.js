'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Calendar from 'react-native-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { editDate } from '../actions/date';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

import { Actions } from 'react-native-router-flux';

// Components
import Button from '../components/button';
import ListTrainingRow from '../components/listTrainingRow';

const customDayHeadings = ['Nie', 'Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob'];
const customMonthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj','Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

/* Component ==================================================================== */
class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      splashScreenVisible: this.props.showSplashScreen || false,
      selectedDate: this.props.currentDate,
      visibleCalendar: false,
    }
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.renderFakeTraining = this.renderFakeTraining.bind(this);
  }

  toggleCalendar() {
    if(this.state.visibleCalendar) {
      this.setState({visibleCalendar: false});
    } else {
      this.setState({visibleCalendar: true});
    }
  }
  changeDate(date) {
    this.props.editDate(date);
    this.setState({visibleCalendar: false, selectedDate: date});
  }
  renderFakeTraining() {
      return (
        <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
      )
  }

  /* Render ==================================================================== */
  render() {
    return (
      <View style={[AppStyles.container]}>
        <View style={[
          AppStyles.row,
          AppStyles.trainingBar]}>
          <Text style={[styles.dateText]}>
            {moment(this.state.selectedDate).format('DD.MM.YYYY r.')}
          </Text>
          <TouchableOpacity
            onPress={this.toggleCalendar}
            activeOpacity={0.7} 
            style={styles.navbarButton}
            hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
              <Icon name='calendar' size={30} color={AppConfig.primaryColor} />
          </TouchableOpacity>
        </View>
          {this.state.visibleCalendar ? 
            <View style={[styles.calendar]}>
                <Calendar
                    ref="calendar"
                    showControls
                    dayHeadings={customDayHeadings}
                    monthNames={customMonthNames}
                    titleFormat={'MMMM'}
                    prevButtonText={'Poprzedni'}
                    nextButtonText={'Następny'}
                    onDateSelect={(date) => this.changeDate(date)}
                />
                <View>
                  <TouchableOpacity
                    onPress={this.toggleCalendar}
                    activeOpacity={0.7} 
                    style={styles.rest}
                  >
                  </TouchableOpacity>
                </View>
            </View>
          : null }
          <View style={[AppStyles.container, styles.paddingBottom]}>
            <ScrollView style={[AppStyles.container, styles.listTraining]}>
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
              <ListTrainingRow title={'Martwy Ciag'} liftWeight={50} reps={5} />
            </ScrollView>
          </View>
          <View style={[styles.bulbButtonContainer]}>
            <Button type='bulb' text="+"  onPress={Actions.listExercisesScreen} />
          </View>   
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { currentDate: state.currentDate };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { editDate })(MainScreen);

MainScreen.propTypes = {
 //TODO
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listTraining: {

  },
  navbarButton: {
    position: 'absolute',
    right: 20,
    top: 4,
  },
  bulbButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
  rest: {
    backgroundColor: 'transparent',
    height: AppConfig.windowHeight,
    flexDirection:'column',
    flex: 1,
    alignSelf: "stretch",
  },
  calendar: {
    marginTop: -40,
  },
  dateText: {
    fontFamily: AppConfig.baseFont,
    color: AppConfig.primaryColor,
    fontSize: AppConfig.baseFontSize * 1.5,
    lineHeight: parseInt((AppConfig.baseFontSize * 1.5) + (AppConfig.baseFontSize * 0.5)),
  },
  paddingBottom: {
    paddingBottom: 55,
  },
});

