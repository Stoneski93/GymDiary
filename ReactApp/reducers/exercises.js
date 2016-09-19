import * as actions from '../actions/actionTypes';
var DB = require('../db.js');
// DB Emitter Initialized
 
var DBEvents = require('react-native-db-models').DBEvents;


var initialState = [];

// DB.exercises.get_all(function(result){
//     var data = [];
//     console.log(result);
//     for(var i = 1; i<result.totalrows; i++){
//       data.push(result.rows[i]);
//       console.log(data);
//     }
//     console.log(data);
//     initialState = data;
//   });

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.EXERCISE_TOOGLE_FAVOURITE:
      // TODO concaty 
      return state;
    case actions.GET_EXERCISE:
      return [...state];
    default:
      return state;
  }
}
