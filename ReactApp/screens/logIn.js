'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginUser, authError } from '../actions/auth';
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

import { Actions } from 'react-native-router-flux';

// Components
import Button from '../components/button'
import Alerts from '../components/alerts'

/* Component ==================================================================== */
class LogIn extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct({
        login: FormValidation.String,
        password: FormValidation.String,
      }),
      form_values: {},
      options: {
        fields: {
          login: { label: 'E-mail', error: 'Podaj login' },
          password: { label: 'Hasło', password: true, secureTextEntry: true, error: 'Podaj hasło' },
        },
        hasError: true,
      },
    }
    this.sendLogin = this.sendLogin.bind(this);
    this.goSignIn = this.goSignIn.bind(this);
  }

  sendLogin() {
    this.props.authError(false);
    const formValues = this.refs.form.getValue();
    if(formValues) {
      const {login, password} = formValues;
      this.props.loginUser(login, password);
    }
  }

  goSignIn() {
    this.props.authError(false);
    Actions.signIn();
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
                Zaloguj się
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
                    Nieprawidłowy login lub hasło.
                  </Text>
                  : null}
            </View>
            <View style={[AppStyles.row]}>
              <View style={[AppStyles.flex1]}>
                <Button
                  text={'Zaloguj się'}
                  onPress={this.sendLogin} />
              </View>
            </View>
            <View style={[AppStyles.row]}>
              <View style={[AppStyles.flex1]}>
                <Button
                  text={'Nie posiadam konta'}
                  onPress={this.goSignIn} />
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
    errorAuth: state.auth.errorAuth
  };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { loginUser, authError })(LogIn);