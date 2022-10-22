import {
    AUTHENTICATION
} from '../actions/types';

const initialState = {
    isAuthenticated       : false,
};

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case AUTHENTICATION : 
            return {
                ...state,
                isAuthenticated : payload
            };
        default:
            return state;
    }
}

export default authReducer;