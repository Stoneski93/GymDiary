'use strict';
 
/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { addTraining } from '../actions/trainings';
import { addSetFb } from '../actions/sets';

import FormValidation from 'tcomb-form-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

import { Actions } from 'react-native-router-flux';

// Components
import Button from '../components/button';
import Alerts from '../components/alerts'

/* Component ==================================================================== */
class Training extends Component {
  constructor(props) {
    super(props);

  this.state = {
    resultMsg: {
      status: '',
      success: '',
      error: '',
    },
    form_fields: FormValidation.struct({
      weight: FormValidation.Number,
      reps: FormValidation.Number,
    }),
    form_values: {},
    options: {
      fields: {
        weight: { error: 'Ciezar (kg)', placeholder: 'kg', label: 'Cięzar (kg)' },
        reps: { error: 'Powtorzenia', placeholder: 'szt.', label: 'Powtorzenia' },
      },
      hasError: true,
    },
    splashScreenVisible: this.props.showSplashScreen || false,
    }
    this.addTraining = this.addTraining.bind(this);
}

addTraining() {
  let { weight, reps }  = this.refs.form.getValue();
  let isWorkout = false;
  let isTraining = false;

  let set = {
    weight: weight,
    reps: reps,
  }

  this.props.workouts.filter(workout => {
    if(this.props.date === workout.data) {
      isWorkout = true;
      workout.trainings.map(training => {
        if(this.props.trainings[training].id_exe === this.props.currentExercise){
          isTraining = true;
          this.props.addSetFb(set,this.props.trainings[training].id_exe);
        } 
      });
      if(!isTraining) {
        console.log('dodaje trening');
      }
    }
  });

if(!isWorkout) {
  console.log('dodaje workout');
}
 
}
  /* Render ==================================================================== */
  render() {
    var Form = FormValidation.form.Form;

    return (
      <View style={[AppStyles.container, AppStyles.containerCenteredV, styles.mainContainer]}>
        <View style={[AppStyles.row, AppStyles.detailsBar]}>
          <Text>Martwy Ciąg</Text>
        </View>
        <View style={[
          AppStyles.containerCentered,
          AppStyles.mainContainer,
          styles.margins,
          styles.nestedContainer]}>
          <View style={[
            AppStyles.paddingHorizontal,
            styles.borderContainer]}>
              <Alerts
                status={this.state.resultMsg.status}
                success={this.state.resultMsg.success}
                error={this.state.resultMsg.error} />
              <Form
                ref="form"
                type={this.state.form_fields}
                value={this.state.empty_form_values}
                options={this.state.options} />
              <View style={[
                AppStyles.row,
                AppStyles.containerCentered,
                styles.addTrainingButton]}>
                <Button
                  text={'Dodaj'}
                  onPress={this.addTraining} />
              </View>
            </View>
        </View>
        <TouchableOpacity style={[
          AppStyles.row,
          AppStyles.detailsBar,
          AppStyles.containerCentered,
          styles.customActionBar]}
          onPress={Actions.listExercisesScreen}       
        >
          <Text>
            Powrót
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Training.propTypes = {
 //TODO
}

function mapStateToProps(state) {
  //const workouts = Object.keys(state.workouts).map(function (key) { return state.workouts[key]; });
  return { 
    date: state.date,
    workouts: state.workouts,
    trainings: state.trainings,
    sets: state.sets,
    currentExercise: state.current.currentExercise  
   };
}


/* Styles ==================================================================== */
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e9ebee',
  },
  nestedContainer: {
    backgroundColor: AppConfig.secondaryColor,
  },
  navbarButton: {
    position: 'absolute',
    right: 20,
    top: 4,
  },
  customActionBar: {
    position: 'absolute',
    bottom: 0,
  },
  addTrainingButton: {
    alignSelf: "stretch",
  },
  bulbButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  imageContainer: {
    width: 300,
    height: 200,
    marginTop: 20,
  },
  mainImage: {
    width: 300,
    height: 200,
  },
  customActionBarConfirmed: {
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 40,
  },
  borderContainer: {
    borderWidth: 1,
    alignSelf: "stretch",
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    padding: 20,
  },
  wrapperContainer: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  margins: {
    marginTop: 20,
    marginBottom: 100,
    paddingBottom: 20,
  },
});



/* Export Component =================================================== */
export default connect(mapStateToProps, { addTraining, addSetFb })(Training);