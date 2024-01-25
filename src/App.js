import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";

import SignIn from "./components/Auth/SignIn";
import CardsComponent from "./components/cards";
import GameSetting from "./components/GameSetting/GameSetting";
import Dashboard from "./components/Dashboard/Dashboard";
import DeckImageDetail from "./components/Deck/deck-detail";
import Deck from "./components/Deck/Deck";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Player from "./components/Player/Player";
import GameResult from "./components/GameResult/GameResult";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/leaderboard" element={<LeaderBoard />} />
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/deck" element={<Deck />} />
          <Route exact path="/deck/:id" element={<DeckImageDetail />} />
          <Route exact path="/config" element={<GameSetting />} />
          <Route exact path="/result" element={<GameResult />} />
          <Route exact path="/tournament" element={<GameResult />} />
          <Route exact path="/cards" element={<CardsComponent />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
