'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Calendar from 'react-native-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { changeDateWithFetch, changeDate } from '../actions/date';
import { fetchWorkouts } from '../actions/workouts';
import { fetchHistoryRecordsFb } from '../actions/history';

import { setLoading } from '../actions/current';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import { Actions } from 'react-native-router-flux';

// Components
import Button from '../components/button';
import Timer from '../components/timer';
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
  }

  componentWillMount() {
    this.props.fetchWorkouts(this.props.date, this.props.uid)
  }

  toggleCalendar() {
    if(this.state.visibleCalendar) {
      this.setState({visibleCalendar: false});
    } else {
      this.setState({visibleCalendar: true});
    }
  }
  
  changeDate(date) {
    if(this.props.workouts.filter(workout => workout.id === date).length > 0) {
      this.props.changeDate(date);
    } else {
      this.props.changeDateWithFetch(date, this.props.uid);
    }
    this.setState({visibleCalendar: false, selectedDate: date});
  }

  filterWorkouts() {
    let allTrainings = this.props.workouts;
    let workout = allTrainings.filter(training => training.data === this.props.date);

    return workout.length ? workout[0] : null;
  }

  /* Render ==================================================================== */
  render() {
    let dailyTrainings = this.filterWorkouts();
    return (
      <View style={[AppStyles.container, styles.back]}>
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
          <View style={[AppStyles.container]}>
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
          { !this.state.visibleCalendar ?
            <ScrollableTabView renderTabBar={() => <ScrollableTabBar />} >
              <View tabLabel="Dziennik" style={[AppStyles.container, styles.paddingBottom, styles.mainContainer]}>
                {dailyTrainings && !this.props.loading ? 
                <ListTrainings trainings={this.props.trainings}
                dailyTrainings={dailyTrainings.trainings}
                dailyWorkout={dailyTrainings} />
                  : 
                null }
              </View>
              <View tabLabel="Timer" style={[AppStyles.container, styles.paddingBottom, styles.mainContainer]}>
                <Timer secondsRemaining={60} />
              </View>
            </ScrollableTabView>
          : 
              <TouchableOpacity 
              style={[AppStyles.container, styles.paddingBottom, styles.mainContainer]}
              activeOpacity={1} 
              onPress={this.toggleCalendar}>
              </TouchableOpacity>
          }
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
    newWorkouts: state.workouts,
    date: state.date,
    uid: state.auth.userId,
    workouts: workouts,
    sets: state.sets,
    trainings: state.trainings,
    loading: state.current.loading,
   };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { changeDateWithFetch, changeDate, fetchWorkouts, fetchHistoryRecordsFb })(MainScreen);

MainScreen.propTypes = {
 //TODO
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listTraining: {
    margin: 5,
    backgroundColor: AppConfig.fifthColor,
    borderBottomWidth: 3,
    borderColor: AppConfig.primaryColor,
    
  },
  back: {
    position: 'relative',
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
   marginTop: 0,
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
  centering: {
		position: 'absolute',
		//backgroundColor: 'black',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
		zIndex: 55,
  },
});