import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.slice";
import dashboardReducer from "./reducers/dashboard.slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});
