import CryptoJS from 'crypto-js';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';

import { AUTHENTICATION, NOT_AUTHENTICATION } from './actions/types';
import Signin from './components/auth/signin';
import GameConfigure from './components/config/index';
import Dashboard from "./components/dashboard/index";
import DeckImageDetail from './components/decks/deck-detail';
import DecksDetail from "./components/decks/detail";
import Decks from "./components/decks/index";
import Leaderboard from "./components/leaderboard/index";
import Players from "./components/players/index";
import GameResult from './components/result/index';
import CardsComponent from './components/cards';

const App = () => {

    useEffect(() => {
        const signData = localStorage.getItem('SignData');
        const tokenData = localStorage.getItem('TokenData');

        if (tokenData && tokenData.success === 'true') {
            let token = CryptoJS.HmacSHA1(tokenData.msg, signData.signature);
            if (token === tokenData.token) {
                store.dispatch({
                    type: AUTHENTICATION,
                    payload: true,
                });
            } else {
                store.dispatch({
                    type: NOT_AUTHENTICATION,
                    payload: false
                });
            }
        } else {
            store.dispatch({
                type: NOT_AUTHENTICATION,
                payload: false
            })
        }
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Signin />} />
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/leaderboard" element={<Leaderboard />} />
                    <Route exact path="/players" element={<Players />} />
                    <Route exact path="/decks" element={<Decks />} />
                    <Route exact path="/decks/:id" element={<DecksDetail />} />
                    <Route exact path="/deck-detail/:id" element={<DeckImageDetail />} />
                    <Route exact path="/game-config" element={<GameConfigure />} />
                    <Route exact path="/game-result" element={<GameResult />} />
                    <Route exact path='/tournament' element={<GameResult />} />
                    <Route exact path='/cards' element={<CardsComponent />} />
                </Routes>
            </Router>
        </Provider>
    );

}

export default App;