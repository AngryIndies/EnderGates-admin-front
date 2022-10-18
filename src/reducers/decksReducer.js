import {
    DECKS_ALL_DATA,
} from '../actions/types';

const initialState = {
    decks_data      : [],
};

const decksReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DECKS_ALL_DATA:
            console.log(payload)
            return {
                ...state,
                decks_data : payload
            }
        default:
            return state;
    }
}

export default decksReducer;