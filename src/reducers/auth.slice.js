import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
