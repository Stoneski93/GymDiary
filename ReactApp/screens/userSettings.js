'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addUser, editUser } from '../actions/user';
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
class UserSettings extends Component {

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
        nickname: FormValidation.String,
        height: FormValidation.Number,
        weight: FormValidation.Number,
        calories: FormValidation.Number,
      }),
      empty_form_values: {
        nickname: usr.nickname,
        height: usr.height,
        weight: usr.weight,
        calories: usr.calories,
      },
      form_values: {},
      options: {
        fields: {
          nickname: { label: 'Pseudonim', error: 'Podaj pseudonim' },
          height: { label: 'Wzrost', error: 'Podaj nazwisko' },
          weight: { label: 'Waga', error: 'Podaj wage' },
          calories: { label: 'Kalorie', error: 'Podaj kalorie' },
        },
        hasError: true,
      },
    }
    this.saveSettings = this.saveSettings.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ 
      empty_form_values : nextProps.user,
     });
  }

  saveSettings() {
    // TODO check validation
    const formValues = this.refs.form.getValue();

    Actions.training();
    this.props.editUser(formValues);
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
                {this.state.form_values.First_name == '' ? "Zaloz Konto" : "Zaktualizuj Profil"}
            </Text>
            <Form
              ref="form"
              type={this.state.form_fields}
              value={this.state.empty_form_values}
              options={this.state.options} />
            <View style={[AppStyles.row]}>
              <View style={[AppStyles.flex1]}>
                <Button
                  text={'Dalej'}
                  onPress={this.saveSettings} />
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
  return { user: state.user };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { addUser, editUser })(UserSettings);