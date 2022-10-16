import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import store        from './store';
import Header       from './components/layout/header';
import Sidebar      from './components/layout/sidebar';

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
                <Header />
                <Sidebar />
                <Routes>
                    <Route exact path = "/"                 element = {<Dashboard/>} />
                    <Route exact path = "/leaderboard"      element = {<Leaderboard/>} />
                    <Route exact path = "/players"          element = {<Players />} />
                    {/* <Route excat path = "/playerdex/:id"    element = {<PlayerDex />} />1 */}
                    <Route exact path = "/decks"            element = {<Decks />} />
                    <Route exact path = "/decks/:id"        element = {<DecksDetail />} />
                    <Route exact path = "/deck-detail/:id"  element = {<DeckImageDetail />} />
                    <Route exact path = "/game-config"           element = {<GameConfigure />} />
                    <Route exact path = "/game-result"           element = {<GameResult />} />
                </Routes>
            </Router>
        </Provider>
    );

}

export default App;