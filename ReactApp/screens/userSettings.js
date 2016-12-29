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
import FormValidate from 'tcomb-form-native'
import FormCalories from 'tcomb-form-native'

// App Globals
import AppStyles from '../styles'
import AppUtil from '../util'
import AppDB from '../db'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

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
      form_fields_weight: FormValidate.struct({
        weight: FormValidate .Number,
      }),
      form_fields_calories: FormValidate.struct({
        calories: FormValidate.Number,
      }),
      empty_form_values: {
        weight: usr.weight,
        calories: usr.calories,
      },
      form_values: {},
      options: {
        fields: {
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
    //const formValues = this.refs.form.getValue();

    Actions.training();
    this.props.editUser(formValues);
  }
  render() {
    var FormWeight = FormValidate.form.Form;
    var FormCalories = FormValidate.form.Form

    return (
      <View
        ref={'scrollView'}
        style={[AppStyles.container]}>
        <ScrollableTabView style={{marginTop: 52}} renderTabBar={() => <ScrollableTabBar />} >
          <View tabLabel="Waga" style={[AppStyles.mainContainer]}>
              <View>
                <Text>Aktualna waga: {this.state.empty_form_values.weight}</Text>
              </View>
              <Alerts
                status={this.state.resultMsg.status}
                success={this.state.resultMsg.success}
                error={this.state.resultMsg.error} />
              <FormWeight
                ref="formWeight"
                type={this.state.form_fields_weight}
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
           <View tabLabel="Kalorie" style={[
            AppStyles.globalMargin,
            AppStyles.containerCentered,
            ]}>
            <View>
                <Text>Aktualna waga: {this.state.empty_form_values.weight}</Text>
              </View>
              <Alerts
                status={this.state.resultMsg.status}
                success={this.state.resultMsg.success}
                error={this.state.resultMsg.error} />
              <FormCalories
                ref="formCalories"
                type={this.state.form_fields_calories}
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
        </ScrollableTabView>
      </View>
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