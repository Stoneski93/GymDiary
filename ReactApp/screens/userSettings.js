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
        Pseudonim: FormValidation.String,
        Wzrost: FormValidation.Number,
        Waga: FormValidation.Number,
        Kalorie: FormValidation.Number,
      }),
      empty_form_values: {
        Pseudonim: usr.nickname,
        Wzrost: usr.height,
        Waga: usr.weight,
        Kalorie: usr.calories,
      },
      form_values: {},
      options: {
        fields: {
          Pseudonim: { error: 'Podaj pseudonim' },
          Wzrost: { error: 'Podaj nazwisko' },
          Waga: { error: 'Podaj wage' },
          Kalorie: { error: 'Podaj kalorie' },
        },
        hasError: true,
      },
    }
    this.saveSettings = this.saveSettings.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.user.nickname);
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
            value={this.state.empty_form_values}
            options={this.state.options} />
        </View>
        <View style={AppStyles.hr} />
        <View style={[AppStyles.paddingHorizontalLar]}>
          <Button
            text={'Sign In'}
            onPress={this.saveSettings} />
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