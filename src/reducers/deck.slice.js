import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "../config/config";

// Async thunk for fetching all decks
export const fetchAllDecks = createAsyncThunk(
  "decks/fetchAllDecks",
  async (_, { dispatch }) => {
    const dashboardInfos = await axios.get(HOST_URL + "getDashboardInfos");
    const decksInfo = await axios.get(
      HOST_URL + "getAllDecks?from=0&limit=" + dashboardInfos.data.totalDecks
    );
    return decksInfo.data;
  }
);

// Async thunk for fetching decks with pagination
export const fetchDecks = createAsyncThunk(
  "decks/fetchDecks",
  async ({ from, cnt }, { dispatch }) => {
    const result = await axios.get(
      HOST_URL + "getAllDecks?from=" + from + "&limit=" + cnt
    );
    return result.data;
  }
);

const decksSlice = createSlice({
  name: "decks",
  initialState: {
    decksData: [],
    decksAllData: [],
    status: "idle", // Assuming you want to include a status field
    error: null,
  },
  reducers: {
    setDecksData: (state, action) => {
      state.decksData = action.payload;
    },
    setDecksAllData: (state, action) => {
      state.decksAllData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDecks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllDecks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.decksAllData = action.payload;
      })
      .addCase(fetchAllDecks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDecks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDecks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.decksData = action.payload;
      })
      .addCase(fetchDecks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setDecksData, setDecksAllData } = decksSlice.actions;

export default decksSlice.reducer;
