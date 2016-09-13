'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
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

  /* Render ==================================================================== */
  render() {
    return (
      <View style={[AppStyles.container]} onPress={()=>{this.setState({visibleCalendar: false})}}>
        <View style={[AppStyles.row, AppStyles.trainingBar, AppStyles.containerCentered]}>
          <Text>{moment(this.state.selectedDate).format('DD MM YYYY')}</Text>
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
                  //
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
        {!this.state.visibleCalendar ? 
          <View style={[AppStyles.container, AppStyles.containerCentered, styles.bulbButtonContainer]}>
            <Button type='bulb' text="+"  onPress={Actions.listExercisesScreen} />
          </View>
        : null}
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
  navbarButton: {
    position: 'absolute',
    right: 20,
    top: 4,
  },
  bulbButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  relativeContainer: {
    position: 'relative',
    top:0,
    width:100,
    
  },
  calendar: {
    display: 'block',
    marginTop: -40,
  },
  hidden: {
    display: 'none',
  },
  rest: {
    backgroundColor: 'transparent',
    height: AppConfig.windowHeight,
    flexDirection:'column',
    flex: 1,
    alignSelf: "stretch",
    zIndex: 2,
  }
});

