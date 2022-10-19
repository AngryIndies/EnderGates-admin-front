import {
    DECKS_ALL_DATA,
    DECKS_DATA,
} from '../actions/types';

const initialState = {
    decks_data      : [],
    decks_all_data  : [],
};

const decksReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DECKS_DATA:
            return {
                ...state,
                decks_data : payload
            }
        case DECKS_ALL_DATA:
            return {
                ...state,
                decks_all_data : payload
            }
        default:
            return state;
    }
}

export default decksReducer;