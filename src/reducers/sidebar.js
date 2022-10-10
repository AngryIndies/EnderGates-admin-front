import {
    SIDEBAR_TAG_DASHBOARD,
    SIDEBAR_TAG_LEADERBOARD,
} from '../actions/types';

const initialState = {
    sidebar_tag: '',
};

const leaderboardReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case SIDEBAR_TAG_DASHBOARD:
            return {
                ...state,
                sidebar_tag : payload
            };
        case SIDEBAR_TAG_LEADERBOARD:
            return {
                ...state,
                sidebar_tag : payload
            }
        default:
            return state;
    }
}

export default leaderboardReducer;