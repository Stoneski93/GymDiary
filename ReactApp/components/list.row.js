'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

/* Component ==================================================================== */
class ListRow extends Component {

  static defaultProps = {
    title: 'Lorem Ipsum',
  }

  render() {
    let { title, image, onPress } = this.props;

    if(image) {
      return (
        <TouchableOpacity 
          style={[styles.listRow, image && styles.imageBackground]} 
          onPress={onPress} activeOpacity={0.7}>
          <Text style={[AppStyles.baseText, styles.listRow_text, styles.listRowImage_text]}>{title.toUpperCase()}</Text>
          <TouchableOpacity activeOpacity={0.7} 
              style={styles.navbarButton}
              hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
            <Icon name='calendar' size={30} color={AppConfig.primaryColor} />
          </TouchableOpacity>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={[styles.listRow]} onPress={onPress} activeOpacity={0.7}>
          <View style={styles.listRowInner}>
            <Text style={[AppStyles.baseText, styles.listRow_text]}>{title.toUpperCase()}</Text>
            <TouchableOpacity activeOpacity={0.7} 
              style={styles.infoButton}
              hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
              <Icon name='star' size={20} color={AppConfig.primaryColor} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} 
              style={styles.starButton}
              hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
              <Icon name='star' size={20} color={AppConfig.primaryColor} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    }
  }
}

ListRow.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  image: React.PropTypes.string,
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  listRow: {
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
  },
  navbarButton: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  listRowInner: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppConfig.borderColor,
  },
  listRow_text: {
    color: AppConfig.textColor,
    textAlign: 'left',
    marginLeft: 20,
    fontWeight: '400',
    backgroundColor: 'transparent',
  },
  listRowImage_text: {
    color: "#FFF",
  },

  // With Image
  imageBackground: {
    backgroundColor: "#333",
  },
  imageBackground_image: {
    height: AppConfig.windowHeight / 4,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
  }
});

/* Export Component ==================================================================== */
export default ListRow