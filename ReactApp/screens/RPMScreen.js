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
import { addWorkoutFb } from '../actions/workouts';
import { addTraining } from '../actions/trainings';
import { addTrainingFb } from '../actions/trainings';
import { addSetFb, addSet, fetchSets } from '../actions/sets';

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
class RPMScreen extends Component {
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
        weight: { error: 'Ciezar (kg)', placeholder: 'ciezar (kg)'},
        reps: { error: 'Powtorzenia', placeholder: 'szt.' },
      },
      hasError: true,
    },
    splashScreenVisible: this.props.showSplashScreen || false,
    }
    this.countRPM = this.countRPM.bind(this);
}

countRPM() {
  let { weight, reps }  = this.refs.form.getValue();
  let isWorkout = false;
  let isTraining = false;

  let set = {
    weight: weight,
    reps: reps,
  }
}
  /* Render ==================================================================== */
  render() {
    var Form = FormValidation.form.Form;
    Form.stylesheet.fieldset.flexDirection = 'row';
    Form.stylesheet.formGroup.normal.flex = 1;
    Form.stylesheet.formGroup.error.flex = 1;
    Form.stylesheet.controlLabel.normal.fontSize = 0;

    return (
      <View style={[AppStyles.container, AppStyles.containerCenteredV, styles.mainContainer]}>
        <View style={[
          AppStyles.mainContainer]}>
          <View style={[AppStyles.paddingHorizontal, styles.kontener]}>
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
                styles.addTrainingButton]}>
                <Button
                  text={'Oblicz'}
                  onPress={this.countRPM} />
              </View>
          </View>
        </View>
        <TouchableOpacity style={[
          AppStyles.row,
          AppStyles.detailsBar,
          AppStyles.containerCentered,
          styles.customActionBar]}
          onPress={Actions.listExercisesScreen}>
          <Text>
            Powrót
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

RPMScreen.propTypes = {
 //TODO
}

function mapStateToProps(state) {
  return { 
  
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
  kontener: {
    flex: 1,
    paddingTop: 80,
    padding: 20,
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
    textAlign: 'center',
    alignItems: 'center',
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
export default connect(mapStateToProps, { addTraining, addSetFb, addSet, addTrainingFb, fetchSets, addWorkoutFb })(RPMScreen);

// 