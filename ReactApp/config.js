/**
 * Global App Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import Dimensions from 'Dimensions';

/* Setup ==================================================================== */
exports.title = 'GlobalConfig';

/* Default Styles ==================================================================== */
// Window Dimensions
var window = Dimensions.get('window');
exports.windowHeight = window.height;
exports.windowWidth = window.width;

// Grid
exports.windowWidthHalf = window.width * 0.5;
exports.windowWidthYhird = window.width * 0.333;
exports.windowWidthYwoThirds = window.width * 0.666;
exports.windowWidthQuarter = window.width * 0.25;
exports.windowWidthThreeQuarters = window.width * 0.75;

// General Element Dimensions
var navbarHeight = 64;
exports.navbarHeight = navbarHeight;
exports.statusBarHeight = 22;

// Fonts
exports.baseFont = 'Roboto-Regular';
exports.baseFontSize = 14;

// Colors

exports.primaryColor = "#000000";
exports.secondaryColor = "#fff";
exports.thirdColor = "#ffd400";
exports.forthColor = "#1a1e21";
exports.fifthColor = "#e9ebee";
exports.textColor = "#000000";
exports.borderColor = "#E7E7E7";
exports.errorColor = "#a94442"
// exports.textColor = "#555";