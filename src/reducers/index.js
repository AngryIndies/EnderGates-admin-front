import { combineReducers } from 'redux';

import authReducer         from './authReducer';
import dashboardReducer     from './dashboard';
import leaderboardReducer   from './leaderboard';
import sidebarReducer       from './sidebar';
import playersReducer       from './playerReducer';
import decksReducer         from './decksReducer';

export default combineReducers({
    authReducer,
    dashboardReducer,
    leaderboardReducer,
    sidebarReducer,
    playersReducer,
    decksReducer,
});