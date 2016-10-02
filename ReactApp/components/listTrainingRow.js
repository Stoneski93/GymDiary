/**
 * List Row
 *
    <ListRow 
      title={title}
      image={entry.entry_image}
      onPress={()=>{alert('Go To Entry View')}} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import SetsRow from './setsRow';

import Icon from 'react-native-vector-icons/FontAwesome';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'

//Screen

/* Component ==================================================================== */
class ListTrainingRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
    }
  
    this.goToTrainingScreen = this.goToTrainingScreen.bind(this);
    this.renderSets = this.renderSets.bind(this);
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.sets.filter(set => set.id_t === this.props.trainings.id)),
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.sets.filter(set => set.id_t === nextProps.trainings.id)),
    });
  }

  goToTrainingScreen() {
    //this.props.setCurrentTraining(this.props.id);
    Actions.trainingScreen();
  }
  renderSets(data) {
     return (
      <SetsRow 
        sets={data}
        onPress={this.goToTrainingScreen}
         />
    );
  }
/* Render ==================================================================== */
  render() {
    let { title, onPress } = this.props;
      return (
        <TouchableOpacity style={[styles.listRow]}
        activeOpacity={1}>
          <View style={[styles.trainingBar]}>
            <View style={[styles.labelContainer]}>
              <Text style={[styles.label]}>
                {title}
              </Text>
            </View>
            <View>
              <ListView
                initialListSize={3}
                automaticallyAdjustContentInsets={false}
                dataSource={this.state.dataSource}
                renderRow={this.renderSets}
                contentContainerStyle={AppStyles.paddingBottom} 
                style={[styles.listContainer]}
              />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  ListTrainingRow.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
  }

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  trainingBar: {
    padding: 5,
    lineHeight: 20,
    borderWidth: 2,
    borderColor: AppConfig.secondaryColor,
    borderRadius: 2,
    backgroundColor: AppConfig.secondaryColor,
    justifyContent: 'flex-start'
  },
  listRow: {
    margin: 2,
  },
  labelContainer: {
    padding: 5,
  },
  label: {
    textAlign: 'right',
  },
});

function mapStateToProps(state) {
  let allSets = state.trainings.entities.sets;
  let oneSet = [];
    
    Object.keys(allSets).forEach(function (key) {
      let obj = allSets[key];
      oneSet.push(obj)  // do something with obj
    });
  
  return {
     sets: oneSet,
  };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps)(ListTrainingRow);