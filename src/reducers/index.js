import { combineReducers } from 'redux';
import dashboard from './dashboard';
import leaderboard from './leaderboard';
import sidebar from './sidebar';

export default combineReducers({
    dashboard,
    leaderboard,
    sidebar,
});