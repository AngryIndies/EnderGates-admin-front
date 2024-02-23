import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "../config/config";

const initialState = {
  totalAIPlayerCount: 0,
  aiPlayersList: [],
  aiPlayerListLoading: false,

  locations: [],
  locationsLoading: false,

  newAiPlayerInfo: {},
  addingNewAiPlayer: false,
};

export const getAiPlayerList = createAsyncThunk(
  "quest/getAiPlayerList",
  async ({ from, limit }) => {
    const result = await axios.get(
      `${HOST_URL}aiPlayerList?from=${from}&limit=${limit}`
    );
    return result.data;
  }
);

export const addAiPlayer = createAsyncThunk(
  "quest/addAiPlayer",
  async ({ newAiPlayer }) => {
    const result = await axios.post(`${HOST_URL}aiPlayer`, newAiPlayer);

    return result.data;
  }
);

export const editAiPlayer = createAsyncThunk(
  "quest/editAiPlayer",
  async ({ aiPlayer }) => {
    const result = await axios.put(`${HOST_URL}aiPlayer`, aiPlayer);

    return result.data;
  }
);

export const removeAiPlayer = createAsyncThunk(
  "quest/removeAiPlayer",
  async ({ id }) => {
    const result = await axios.delete(`${HOST_URL}aiPlayer/${id}`);

    return result.data;
  }
);

export const getLocations = createAsyncThunk("quest/getLocations", async () => {
  const result = await axios.get(`${HOST_URL}location`);

  return result.data.locations;
});

export const addNewLocation = createAsyncThunk(
  "quest/addNewLocation",
  async ({ newLocation }) => {
    const result = await axios.post(`${HOST_URL}location`, newLocation);

    return result.data;
  }
);

export const removeLocation = createAsyncThunk(
  "quest/removeLocation",
  async ({ locationId }) => {
    const result = await axios.delete(`${HOST_URL}location/${locationId}`);

    return result.data;
  }
);

const questSlice = createSlice({
  name: "quest",
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
      .addCase(addAiPlayer.rejected, (state, { error }) => {})

      .addCase(editAiPlayer.pending, (state) => {})
      .addCase(editAiPlayer.fulfilled, (state, { payload }) => {})
      .addCase(editAiPlayer.rejected, (state, { error }) => {})

      .addCase(removeAiPlayer.pending, (state) => {})
      .addCase(removeAiPlayer.fulfilled, (state, { payload }) => {})
      .addCase(removeAiPlayer.rejected, (state, { error }) => {})

      .addCase(addNewLocation.pending, (state) => {})
      .addCase(addNewLocation.fulfilled, (state, { payload }) => {})
      .addCase(addNewLocation.rejected, (state, { error }) => {})

      .addCase(removeLocation.pending, (state) => {})
      .addCase(removeLocation.fulfilled, (state, { payload }) => {})
      .addCase(removeLocation.rejected, (state, { error }) => {})

      .addCase(getLocations.pending, (state) => {
        state.locationsLoading = true;
      })

      .addCase(getLocations.fulfilled, (state, { payload }) => {
        state.locationsLoading = false;
        state.locations = payload;
      })
      .addCase(getLocations.rejected, (state, { error }) => {
        state.locationsLoading = false;
      });
  },
});

export const {} = questSlice.actions;

export default questSlice.reducer;
