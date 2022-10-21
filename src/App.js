import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import store        from './store';
import Header       from './components/layout/header';
import Sidebar      from './components/layout/sidebar';

import Signin       from './components/auth/signin';
import Dashboard    from "./components/dashboard/index";
import Leaderboard  from "./components/leaderboard/index";
import Players      from "./components/players/index";
// import PlayerDex    from "./components/players/dex";
import Decks        from "./components/decks/index";
import DecksDetail  from "./components/decks/detail";
import DeckImageDetail from './components/decks/deck-detail';
import GameConfigure from './components/config/index';
import GameResult from './components/result/index';


const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route exact path = "/"                 element = {<Signin />}/>
                    <Route exact path = "/dashboard"        element = {<><Header /><Sidebar /><Dashboard/></>} />
                    <Route exact path = "/leaderboard"      element = {<><Header /><Sidebar /><Leaderboard/></>} />
                    <Route exact path = "/players"          element = {<><Header /><Sidebar /><Players /></>} />
                    <Route exact path = "/decks"            element = {<><Header /><Sidebar /><Decks /></>} />
                    <Route exact path = "/decks/:id"        element = {<><Header /><Sidebar /><DecksDetail /></>} />
                    <Route exact path = "/deck-detail/:id"  element = {<><Header /><Sidebar /><DeckImageDetail /></>} />
                    <Route exact path = "/game-config"      element = {<><Header /><Sidebar /><GameConfigure /></>} />
                    <Route exact path = "/game-result"      element = {<><Header /><Sidebar /><GameResult /></>} />
                </Routes>
            </Router>
        </Provider>
    );

}

export default App;