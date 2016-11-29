'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createUser, authError } from '../actions/auth';
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

import { Actions } from 'react-native-router-flux';

// Components
import Button from '../components/button'
import Alerts from '../components/alerts'

/* Component ==================================================================== */
class SignIn extends Component {

  constructor(props) {
    super(props);

    // Initial state
    const usr = this.props.user;

    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct({
        email: FormValidation.String,
        password: FormValidation.String,
      }),
      form_values: {},
      options: {
        fields: {
          email: { label: 'E-mail', error: 'Podaj email' },
          password: { label: 'Hasło', password: true, secureTextEntry: true, error: 'Podaj hasło' },
        },
        hasError: true,
      },
    }
    this.registerUser = this.registerUser.bind(this);
    this.goLogIn = this.goLogIn.bind(this);
  }

  registerUser() {
    this.props.authError(false);
    const formValues = this.refs.form.getValue();

    if(formValues) {
      const { email, password } = formValues;
      this.props.createUser(email, password);
    }

  }

  goLogIn() {
    this.props.authError(false);
    Actions.logIn();
  }

  render() {
    var Form = FormValidation.form.Form;

    return (
      <ScrollView
        ref={'scrollView'}
        style={[AppStyles.container]}>
        <View style={[
          AppStyles.globalMargin,
          AppStyles.containerCentered,
          ]}>
          <View style={[AppStyles.mainContainer]}>
            <Alerts
              status={this.state.resultMsg.status}
              success={this.state.resultMsg.success}
              error={this.state.resultMsg.error} />
            <Text style={[
              AppStyles.baseText,
              AppStyles.h3,
              AppStyles.centered,
              AppStyles.row,
              AppStyles.paddingBottom]}>
                Rejestracja
            </Text>
            <Form
              ref="form"
              type={this.state.form_fields}
              value={this.state.empty_form_values}
              options={this.state.options} />
            <View style={[AppStyles.row]}>
              {this.props.errorAuth ?
                  <Text style={[
                    AppStyles.error,
                    AppStyles.centered,
                    AppStyles.row,
                    AppStyles.paddingBottom]}>
                    Nieprawidłowy e-mail lub zbyt krótkie hasło.
                  </Text>
                  : null}
            </View>
            <View style={[AppStyles.row]}>
              <View style={[AppStyles.flex1]}>
                <Button
                  text={'Zarejestruj się'}
                  onPress={this.registerUser} />
              </View>
            </View>
            <View style={[AppStyles.row]}>
              <View style={[AppStyles.flex1]}>
                <Button
                    text={'Powrót'}
                    onPress={this.goLogIn} />
              </View>
            </View>
          </View>
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

function mapStateToProps(state) {
  return {
    user: state.user,
    errorAuth: state.auth.errorAuth,
  };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { createUser, authError })(SignIn);