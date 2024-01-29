import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.slice";
import dashboardReducer from "./reducers/dashboard.slice";
import deckReducer from "./reducers/deck.slice";
import aiReducer from "./reducers/ai.slice";
import cardReducer from "./reducers/card.slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    deck: deckReducer,
    ai: aiReducer,
    card: cardReducer,
  },
});
