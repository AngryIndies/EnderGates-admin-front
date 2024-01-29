import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";

import SignIn from "./containers/Auth/SignIn";
import Cards from "./containers/Cards/Cards";
import GameSetting from "./containers/GameSetting/GameSetting";
import Dashboard from "./containers/Dashboard/Dashboard";
import DeckImageDetail from "./containers/Deck/deck-detail";
import Deck from "./containers/Deck/Deck";
import LeaderBoard from "./containers/LeaderBoard/LeaderBoard";
import Player from "./containers/Player/Player";
import GameResult from "./containers/GameResult/GameResult";
import AI from "./containers/AI/AI";

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
          <Route exact path="/cards" element={<Cards />} />
          <Route exact path="/ai" element={<AI />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
