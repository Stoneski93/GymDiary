/**
 * Form SCREEN
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import FormValidation from 'tcomb-form-native'

// App Globals
import AppStyles from '../styles'
import AppUtil from '../util'
import AppDB from '../db'

// Components
import Button from '../components/button'
import Alerts from '../components/alerts'

/* Component ==================================================================== */
class UserSettings extends Component {
  static componentName = 'UserSettings';

  constructor(props) {
    super(props);

    // Email Validation
    var valid_email = FormValidation.refinement(
      FormValidation.String, function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
      }
    );

    // Password Validation - Must be 6 chars long
    var valid_password = FormValidation.refinement(
      FormValidation.String, function (password) {
        if(password.length < 6) return false;
        return true;
      }
    );

    // Initial state
    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct({
        Pseudonim: FormValidation.String,
        Wzrost: FormValidation.String,
        Waga: FormValidation.String,
        Kalorie: FormValidation.String,
      }),
      empty_form_values: {
        Pseudonim: '',
        Wzrost: '',
        Waga: '',
        Kalorie: '',
      },
      form_values: {},
      options: {
        fields: {
          Pseudonim: { error: 'Podaj pseudonim' },
          Wzrost: { error: 'Podaj nazwisko' },
          Waga: { error: 'Podaj wage' },
          Kalorie: { error: 'Podaj kalorie' },
        }
      },
    }
  }

  _signUp = () => {
    // Get new values and update
    var values = this.refs.form.getValue();


    // Form is valid
    if(values) {
      this.setState({form_values: values}, () => {
        this._saveData((result) => {
          this.refs.scrollView.scrollTo({ y: 0 });

          // Show save message
          this.setState({
            resultMsg: {
              success: 'Awesome, that saved!',
            }
          });
        });
      });
    }
  }

  /**
    * RENDER
    */
  render = () => {
    var Form = FormValidation.form.Form;

    return (
      <ScrollView automaticallyAdjustContentInsets={false} 
        ref={'scrollView'}
        style={[AppStyles.container]}
        contentContainerStyle={[AppStyles.containerCentered, styles.container]}>
        <View style={[AppStyles.paddingHorizontal]}>

          <Alerts
            status={this.state.resultMsg.status}
            success={this.state.resultMsg.success}
            error={this.state.resultMsg.error} />

          <Text style={[AppStyles.baseText, AppStyles.h3, AppStyles.centered]}>
            {this.state.form_values.First_name == '' ? "Zaloz Konto" : "Zaktualizuj Profil"}
          </Text>
          
          <View style={AppStyles.spacer_20} />

          <Form
            ref="form"
            type={this.state.form_fields}
            value={this.state.form_values}
            options={this.state.options} />
        </View>
        <View style={AppStyles.hr} />
        <View style={[AppStyles.paddingHorizontalLar]}>
          <Button
            text={'Sign In'}
            onPress={()=>alert('Just for looks')} />
        </View>
      </ScrollView>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

/* Export Component ==================================================================== */
export default UserSettings