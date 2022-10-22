import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import store        from './store';

import Signin       from './components/auth/signin';
import Dashboard    from "./components/dashboard/index";
import Leaderboard  from "./components/leaderboard/index";
import Players      from "./components/players/index";
import Decks        from "./components/decks/index";
import DecksDetail  from "./components/decks/detail";
import DeckImageDetail from './components/decks/deck-detail';
import GameConfigure from './components/config/index';
import GameResult from './components/result/index';
import { AUTHENTICATION, NOT_AUTHENTICATION } from './actions/types';

const App = () => {

    useEffect(() => { 
        var auth = localStorage.getItem('EndersGate');
        if(auth === 'true') {
            store.dispatch({
                type : AUTHENTICATION,
                payload : true,
            })

        } else {
            store.dispatch({
                type : NOT_AUTHENTICATION,
                payload : false
            })
        }
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route exact path = "/"                 element = {<Signin />}/>
                    <Route exact path = "/dashboard"        element = {<Dashboard/>} />
                    <Route exact path = "/leaderboard"      element = {<Leaderboard/>} />
                    <Route exact path = "/players"          element = {<Players />} />
                    <Route exact path = "/decks"            element = {<Decks />} />
                    <Route exact path = "/decks/:id"        element = {<DecksDetail />} />
                    <Route exact path = "/deck-detail/:id"  element = {<DeckImageDetail />} />
                    <Route exact path = "/game-config"      element = {<GameConfigure />} />
                    <Route exact path = "/game-result"      element = {<GameResult />} />
                </Routes>
            </Router>
        </Provider>
    );

}

export default App;