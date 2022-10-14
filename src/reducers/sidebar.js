import {
    SIDEBAR_TAG_DASHBOARD,
    SIDEBAR_TAG_LEADERBOARD,
    SIDEBAR_TAG_PLAYERS,
    SIDEBAR_TAG_DECKS,
} from '../actions/types';

const initialState = {
    sidebar_tag: '',
};

function SidebarReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SIDEBAR_TAG_DASHBOARD:
            console.log('TRUE');
            console.log('Payload : ', payload)
            return {
                ...state,
                sidebar_tag: payload
            };
        case SIDEBAR_TAG_LEADERBOARD:
            return {
                ...state,
                sidebar_tag: payload
            }
        case SIDEBAR_TAG_PLAYERS:
            return {
                ...state,
                sidebar_tag: payload
            }
        case SIDEBAR_TAG_DECKS:
            return {
                ...state,
                sidebar_tag: payload
            }
        default:
            return state;
    }
}

export default SidebarReducer;