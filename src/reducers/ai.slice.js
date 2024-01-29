import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "../config/config";

const initialState = {
  totalAIPlayerCount: 0,
  aiPlayersList: [],
  aiPlayerListLoading: false,

  newAiPlayerInfo: {},
  addingNewAiPlayer: false,
};

export const getAiPlayerList = createAsyncThunk(
  "ai/getAiPlayerList",
  async ({ from, limit }, { dispatchEvent }) => {
    const result = await axios.get(
      `${HOST_URL}aiPlayerList?from=${from}&limit=${limit}`
    );
    return result.data;
  }
);

export const addAiPlayer = createAsyncThunk(
  "ai/addAiPlayer",
  async ({ newAiPlayer }, { dispatchEvent }) => {
    const result = await axios.post(`${HOST_URL}newAiPlayer`, newAiPlayer);

    return result;
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAiPlayerList.pending, (state) => {
        state.aiPlayerListLoading = true;
      })
      .addCase(getAiPlayerList.fulfilled, (state, { payload }) => {
        state.aiPlayersList = payload;
        state.aiPlayerListLoading = false;
      })
      .addCase(getAiPlayerList.rejected, (state, { error }) => {
        state.aiPlayersList = [];
        state.aiPlayerListLoading = false;
        console.log(error);
      })
      .addCase(addAiPlayer.pending, (state) => {})
      .addCase(addAiPlayer.fulfilled, (state, { payload }) => {})
      .addCase(addAiPlayer.rejected, (state, { error }) => {});
  },
});

export const {} = aiSlice.actions;

export default aiSlice.reducer;
