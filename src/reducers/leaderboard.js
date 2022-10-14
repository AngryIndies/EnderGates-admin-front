import {
    PAGINATION_CNT,
} from '../actions/types';

const initialState = {
    pagination_cnt: 10,
};

const leaderboardReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case PAGINATION_CNT:
            return {
                ...state,
                pagination_cnt: payload
            };
        default:
            return state;
    }
}

export default leaderboardReducer;