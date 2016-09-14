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
} from 'react-native'
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
    Ciezar: FormValidation.Number,
    Powtorzenia: FormValidation.Number,
  }),
  form_values: {},
  options: {
    fields: {
      Ciezar: { error: 'Ciezar (kg)', placeholder: 'kg', label: 'Cięzar (kg)' },
      Powtorzenia: { error: 'Powtorzenia', placeholder: 'ilość', label: 'Powtorzenia (Ilosc)' },
    },
    hasError: true,
  },
  splashScreenVisible: this.props.showSplashScreen || false,
  }
}


  /* Render ==================================================================== */
  render() {
    var Form = FormValidation.form.Form;
    //Form.stylesheet.fieldset.flexDirection = 'row';
    //Form.stylesheet.textbox.width = '100';

    return (
      <View style={[AppStyles.container, AppStyles.containerCenteredV]}>
        <View style={[AppStyles.row, AppStyles.detailsBar, AppStyles.containerCentered]}>
          <Text>Martwy Ciąg</Text>
        </View>
        <View style={[AppStyles.container, styles.wrapperContainer, styles.margins]}>
          <View style={[AppStyles.paddingHorizontal, styles.borderContainer]}>
              <Alerts
                status={this.state.resultMsg.status}
                success={this.state.resultMsg.success}
                error={this.state.resultMsg.error} />
              <View style={AppStyles.spacer_20} />
              <View style={AppStyles.spacer_20} />
              <Form
                ref="form"
                type={this.state.form_fields}
                value={this.state.empty_form_values}
                options={this.state.options} />
              <View style={[AppStyles.row, AppStyles.containerCentered, styles.margins, styles.addTrainingButton]}>
                <Button
                  text={'Dodaj'}
                  onPress={Actions.training} />
              </View>
            </View>
        </View>
        <View style={[AppStyles.row, AppStyles.detailsBar,
          AppStyles.containerCentered, styles.customActionBar]}       
        >
          <Text onPress={Actions.listExercisesScreen}>
            Powrót
          </Text>
        </View>
      </View>
    );
  }
}

Training.propTypes = {
 //TODO
}
//TODO
//TEXT POWROT 100% OF BUTTON


/* Styles ==================================================================== */
const styles = StyleSheet.create({
  navbarButton: {
    position: 'absolute',
    right: 20,
    top: 4,
  },
  customActionBar: {
    position: 'absolute',
    bottom: 0,
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
  },
  wrapperContainer: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  margins: {
    marginTop: 20,
    marginBottom: 80,
  },
});

/* Export Component =================================================== */
export default Training