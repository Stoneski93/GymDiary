/**
 * Listing SCREEN
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
  ListView,
  RefreshControl,
  TextInput
} from 'react-native'

import FormSearch from 'tcomb-form-native'

import { connect } from 'react-redux';
import { exerciseToogleFavourite } from '../actions/exercises';

// App Globals
import AppStyles from '../styles'
import AppConfig from '../config'
import AppUtil from '../util'

// Components
import ListRow from '../components/listExercisesRow';

/* Component ==================================================================== */
class ListExercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       }),
       searchText: '',
    }
    
    this.renderRow = this.renderRow.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
    this.toogleFavourite = this.toogleFavourite.bind(this);
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.exercises),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.exercises),
    });
  }

  renderRow(data){
    let { title, image, onPress } = data;

    return (
      <ListRow {...data} onStarPress={this.toogleFavourite} />
    );
  }

  setSearchText(text) {
    const searchText = text.toLowerCase();
    const filteredExercises = this.props.exercises
      .filter((exercise) => {
        var searched = exercise.title.toLowerCase();
        return searched.search(searchText) !== -1;
      });
    this.setState({
        searchText,
        dataSource: this.state.dataSource.cloneWithRows(filteredExercises)
    });
  }

toogleFavourite(data) {
  this.props.exerciseToogleFavourite(data);
}
  /* Render ==================================================================== */
  render() {
    
    return (
      <View style={[AppStyles.container]}>
        <View>
          <TextInput
            placeholder="Wyszukaj..."
            style={styles.searchInput}
            value={this.state.searchText}
            onChangeText={this.setSearchText}
            />
        </View>
        <ListView
          initialListSize={3}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          contentContainerStyle={AppStyles.paddingBottom} 
          style={[styles.listContainer]}
          />
      </View>
    );
  }
}

ListExercises.propTypes = {
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  searchInput: {
    paddingLeft: 20,
    paddingRight: 20
  }
});

function mapStateToProps(state) {
  return { exercises: state.exercises };
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, { exerciseToogleFavourite })(ListExercises);