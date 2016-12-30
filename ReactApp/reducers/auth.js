import * as actions from '../actions/actionTypes';

var initialState = {
    userLogin: null,
    userId: null,
    weight: 0,
    calories: 0,
    errorAuth: false,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case actions.USER_LOGIN:
            return Object.assign({}, state, {
                userLogin: action.payload.email,
                userId: action.payload.uid,
                weight: action.payload.weight,
                calories: action.payload.calories
            });
        case actions.USER_LOGOUT:
            return Object.assign({}, state, {
                userLogin: null
            });
        case actions.ADD_WEIGHT:
            return Object.assign({}, state, {
                weight: action.payload
            });
        case actions.ADD_CALORIES:
            return Object.assign({}, state, {
                calories: action.payload
            });        
        case actions.AUTH_ERROR:
            return Object.assign({}, state, {
                errorAuth: action.payload,
            });
        default:
            return state;
    }
}