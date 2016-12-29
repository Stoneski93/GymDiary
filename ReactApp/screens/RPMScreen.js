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
import RPMTable from '../components/rpmTable'

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
        weight: { label: 'Ciezar', placeholder: 'kg'},
        reps: { label: 'Powtorzenia', placeholder: 'szt.' },
      },
    },
    splashScreenVisible: this.props.showSplashScreen || false,
    rpm: '',
    rpmVisible: false,
    tables: [] 
  }
    this.countRPM = this.countRPM.bind(this);
    this.countProgression = this.countProgression.bind(this);
}

countRPM() {
  let { weight, reps }  = this.refs.form.getValue();
  let rpm = 0;
  rpm = (weight * reps * 0.0333 + weight).toFixed(1);
  this.setState({rpm: rpm, rpmVisible: true});
  this.countProgression(rpm);
}

countProgression(rpm) {
  let newRPM = 0.9 * rpm;
  
  let firstWeek = {
    header: 'Pierwszy tydzień',
    first:  0.7,
    second: 0.75,
    third:  0.8,
    rpm: newRPM,
  }
  let secondWeek = {
    header: 'Drugi tydzień',
    first:  0.75,
    second: 0.8,
    third:  0.85,
    rpm: newRPM,
  }
  let thirdWeek = {
    header: 'Trzeci tydzień',
    first:  0.8,
    second: 0.85,
    third:  0.9,
    rpm: newRPM,
  }
  let forthWeek = {
    header: 'Czwarty tydzień (deload)',
    first:  0.5,
    second: 0.5,
    third:  0.5,
    rpm: newRPM,
  }

  let tab = [];
  tab.push(<RPMTable week={firstWeek} />);
  tab.push(<RPMTable week={secondWeek} />);
  tab.push(<RPMTable week={thirdWeek} />);
  tab.push(<RPMTable week={forthWeek} />);

  this.setState({
    tables: tab,
  })

}
  /* Render ==================================================================== */
  render() {
    var Form = FormValidation.form.Form;
    Form.stylesheet.fieldset.flexDirection = 'row';
    Form.stylesheet.formGroup.normal.flex = 1;
    Form.stylesheet.formGroup.error.flex = 1;
    
    return (
      <View style={[AppStyles.container, AppStyles.containerCenteredV, styles.mainContainer]}>
        <View style={[
          AppStyles.mainContainer]}>
          <View style={[AppStyles.paddingHorizontal, styles.kontener]}>
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
              {this.state.rpmVisible && 
            <View style={[styles.head]}>
              <View >
                <Text>Twoj 1 RPM:</Text>
              </View>
              <View>
                <Text style={[styles.rpm]}>{this.state.rpm} kg</Text>
              </View>
              <View >
                <Text>Miesięczna rozpiska progresji:</Text>
              </View>
               <View >
                <Text>Nowy RPM (90%): {(this.state.rpm * 0.9).toFixed(1)} </Text>
              </View>
            </View>
              }
            <ScrollView>
               
              {this.state.tables}
            </ScrollView>
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
  head: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    textAlign: 'center'
  },
  rpm: {
    color: 'red',
    fontSize: 30,
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