'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

import { Actions } from 'react-native-router-flux';
import { logoutUser } from '../actions/auth';
import { connect } from 'react-redux';

// Components
import Button from '../components/button';

/* Component ==================================================================== */
class LogoutScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            splashScreenVisible: this.props.showSplashScreen || false,
        }
        this.backToMainScreen = this.backToMainScreen.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    backToMainScreen () {
        Actions.training();
    }

    logOut () {
        this.props.logoutUser();
        Actions.home();
    }

    /* Render ==================================================================== */
    render() {
        return (
            <View
                ref={'scrollView'}
                style={[AppStyles.container]}>
                <View style={[
                    AppStyles.globalMargin,
                    AppStyles.containerCentered,
                ]}>
                    <View style={[AppStyles.mainContainer]}>
                        <Text style={[
                            AppStyles.baseText,
                            AppStyles.h3,
                            AppStyles.centered,
                            AppStyles.row,
                            AppStyles.paddingBottom]}>
                            Czy napewno chcesz się wylogować?
                        </Text>
                        <View style={[AppStyles.row]}>
                            <View style={[AppStyles.flex1]}>
                                <Button
                                    text={'Wyloguj'}
                                    onPress={this.logOut} />
                            </View>
                        </View>
                        <View style={[AppStyles.row]}>
                            <View style={[AppStyles.flex1]}>
                                <Button
                                    text={'Powrót'}
                                    onPress={this.backToMainScreen} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

LogoutScreen.propTypes = {

}
//TODO

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
});

function mapStateToProps(state) {
    return {

    };
}
/* Export Component ==================================================================== */
export default connect(mapStateToProps,{ logoutUser })(LogoutScreen);
