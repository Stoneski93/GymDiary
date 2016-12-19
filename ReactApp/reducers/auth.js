import * as actions from '../actions/actionTypes';

var initialState = {
    userLogin: null,
    userId: null,
    errorAuth: false,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case actions.USER_LOGIN:
            return Object.assign({}, state, {
                userLogin: action.payload,
                userId: action.uid
            });
        case actions.USER_LOGOUT:
            return Object.assign({}, state, {
                userLogin: null
            });
        case actions.AUTH_ERROR:
            return Object.assign({}, state, {
                errorAuth: action.payload,
            });
        default:
            return state;
    }
}