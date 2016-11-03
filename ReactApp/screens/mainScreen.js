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
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import Calendar from 'react-native-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { editDate } from '../actions/date';
import { fetchTrainings } from '../actions/trainings';
import { fetchSets } from '../actions/sets';
import { fetchWorkouts } from '../actions/workouts';
import { fetchExercises } from '../actions/exercises';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

import { Actions } from 'react-native-router-flux';

// Components
import Button from '../components/button';
import ListTrainings from '../containers/listTrainings';

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
    this.filterWorkouts = this.filterWorkouts.bind(this);
    this.props.fetchSets();
    this.props.fetchWorkouts();
    this.props.fetchTrainings();
    this.props.fetchExercises();
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

  filterWorkouts() {
    let allTrainings = this.props.workouts;
    let workout = allTrainings.filter(training => training.data === this.props.date)
    
    return workout.length ? workout[0].trainings : null;    
  }


  /* Render ==================================================================== */
  render() {
    let dailyTrainings = this.filterWorkouts();

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
                    onDateSelect={(date => this.changeDate(date.split('T')[0]))}
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
          <View style={[AppStyles.container, styles.paddingBottom, styles.mainContainer]}>
            {dailyTrainings ? 
              <ListTrainings dailyTrainings={dailyTrainings} /> 
                : 
              null }
          </View>
          <View style={[styles.bulbButtonContainer]}>
            <Button type='bulb' text="+"  onPress={Actions.listExercisesScreen} />
          </View>   
      </View>
    );
  }
}

function mapStateToProps(state) {
  const workouts = Object.keys(state.workouts).map(function (key) { return state.workouts[key]; });
  return { 
    date: state.date,
    workouts: workouts,  
   };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { editDate, fetchWorkouts, fetchSets, fetchTrainings, fetchExercises })(MainScreen);

MainScreen.propTypes = {
 //TODO
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listTraining: {
    margin: 5,
    // backgroundColor: AppConfig.forthColor,
    backgroundColor: AppConfig.fifthColor,
    borderBottomWidth: 3,
    borderColor: AppConfig.primaryColor,
    
  },
  mainContainer: {
    backgroundColor: AppConfig.fifthColor,
    
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
    backgroundColor: '#e9ebee',
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

