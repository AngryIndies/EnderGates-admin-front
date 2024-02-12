import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.slice";
import dashboardReducer from "./reducers/dashboard.slice";
import deckReducer from "./reducers/deck.slice";
import questReducer from "./reducers/quest.slice";
import cardReducer from "./reducers/card.slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    deck: deckReducer,
    quest: questReducer,
    card: cardReducer,
  },
});
