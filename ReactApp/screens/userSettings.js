'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { addUser, editUser } from '../actions/user';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import { updateWeight, updateCalories } from '../actions/auth';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import FormValidate from 'tcomb-form-native'
import FormCalories from 'tcomb-form-native'

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

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
        weight: '',
        calories: '',
      },
      form_values: {},
      options: {
        fields: {
          weight: { label: 'Aktualizuj wagę:', error: 'Niedozwolony format' },
          calories: { label: 'Aktualizuj kalorie:', error: 'Niedozwolony format' },
        },
        hasError: true,
      },
    }
    this.updateCalories = this.updateCalories.bind(this);
    this.updateWeight = this.updateWeight.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  updateWeight() {
     let formValues  = this.refs.formWeight.getValue();
  
    if(formValues) {
      this.props.updateWeight(formValues.weight);
    }
  }

  updateCalories() {
    let formValues  = this.refs.formCalories.getValue();
    console.log(formValues);

    if(formValues) {
      this.props.updateCalories(formValues.calories);
    }
  }

  render() {
    var FormWeight = FormValidate.form.Form;
    var FormCalories = FormValidate.form.Form

    return (
      <View ref={'scrollView'} style={[AppStyles.container]}>
        <ScrollableTabView style={{marginTop: 52}} renderTabBar={() => <ScrollableTabBar />} >
           <View tabLabel="Informacje" style={[AppStyles.innerContainer]}>
              <View style={[styles.rowAvatar]}>
                <Image style={[styles.avatar]}
                source={require('../images/user.png')}
                />
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.header]}>Użytkownik:</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={styles.info}>{this.props.user.userLogin}</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.header]}>Aktualna waga: </Text>
              </View>
              <View style={[styles.row]}>
                <Text style={styles.info}> {this.props.user.weight} KG </Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.header]}>Aktualne Kalorie: </Text>
              </View>
              <View style={[styles.row]}>
                <Text style={styles.info}> {this.props.user.calories} KCAL </Text>
              </View>
          </View>
          <View tabLabel="Aktualizacja" style={[AppStyles.mainContainer]}>
            <View>
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
                    text={'Aktualizuj'}
                    onPress={this.updateWeight} />
                </View>
              </View>
            </View>
            <View style={[styles.bottomContainer]}>
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
                    text={'Aktualizuj'}
                    onPress={this.updateCalories} />
                </View>
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
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  innerContainer: {
    flex: 1
  },
  bottomContainer: {
    marginTop: 30,
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 35
  },
  rowAvatar: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    borderWidth: 1
  },
  avatar: {
    width: 100,
    height: 100,   
  },
  info: {
    fontSize: 20,
    color: AppConfig.primaryColor,
  }
});

function mapStateToProps(state) {
  return { 
    user: state.auth,
 };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, {updateWeight, updateCalories })(UserSettings);