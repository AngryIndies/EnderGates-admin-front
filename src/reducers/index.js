import { combineReducers } from 'redux';

import dashboardReducer from './dashboard';
import leaderboardReducer from './leaderboard';
import sidebarReducer from './sidebar';
import playersReducer from './playerReducer';

export default combineReducers({
    dashboardReducer,
    leaderboardReducer,
    sidebarReducer,
    playersReducer,
});