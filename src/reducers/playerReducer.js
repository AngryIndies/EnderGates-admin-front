import {
    PLAYER_DEX_ID,
    SIDEBAR_TAG_DECKS
} from '../actions/types';

const initialState = {
    player_dex_id: -1,
};

const playersReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case PLAYER_DEX_ID:
            return {
                ...state,
                player_dex_id: payload
            };
        case SIDEBAR_TAG_DECKS:
            return {
                ...state,
                player_dex_id : -1
            }
        default:
            return state;
    }
}

export default playersReducer;