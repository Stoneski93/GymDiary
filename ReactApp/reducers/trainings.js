import { normalize, Schema, arrayOf } from 'normalizr';
import * as actions from '../actions/actionTypes';
import * as trainingsDatabase from '../fdatabase/trainings';

// const trainingSchema = new Schema("trainings", { idAttribute: "id" });
// const setSchema = new Schema("sets", { idAttribute: "id" });

// trainingSchema.define({
//   sets: arrayOf(setSchema),
// });

// const initialState = normalize(trainingsDatabase.trainings, arrayOf(trainingSchema));

const initialState = trainingsDatabase;
delete initialState.default;

var keys = Object.keys(initialState);
var arr = Object.keys(initialState).map(function (key) { return initialState[key]; });

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.GET_TRAININGS:
      return state;
    case actions.ADD_TRAINING:
      return state;
    case actions.ADD_SET:
      return state;
    case actions.EDIT_TRAINING:
    case actions.DELETE_TRAINING:
    default:
      return state;
  }
}
