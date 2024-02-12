import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store";

import SignIn from "./containers/Auth/SignIn";
import Cards from "./containers/Cards/Cards";
import Dashboard from "./containers/Dashboard/Dashboard";
import Deck from "./containers/Deck/Deck";
import DeckImageDetail from "./containers/Deck/deck-detail";
import GameResult from "./containers/GameResult/GameResult";
import GameSetting from "./containers/GameSetting/GameSetting";
import LeaderBoard from "./containers/LeaderBoard/LeaderBoard";
import Player from "./containers/Player/Player";
import Locations from "./containers/Quest/Locations/Locations";
import Missions from "./containers/Quest/Missions/Missions";

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
          <Route exact path="/quest/locations" element={<Locations />} />
          <Route exact path="/quest/missions" element={<Missions />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
