import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "../config/config";

// Async Thunks
export const getDashboardMainData = createAsyncThunk(
  "dashboard/getMainData",
  async () => {
    const response = await axios.get(HOST_URL + "getDashboardInfos");
    return response.data;
  }
);

export const getDashboardChartData = createAsyncThunk(
  "dashboard/getChartData",
  async () => {
    const response = await axios.get(HOST_URL + "getGameCountsByDate");
    return response.data;
  }
);

export const getDashboardActivityData = createAsyncThunk(
  "dashboard/getActivityData",
  async (loadMoreCnt) => {
    const response = await axios.get(
      HOST_URL + `getLastActivities?from=0&limit=${loadMoreCnt}`
    );
    return response.data;
  }
);

// Dashboard Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    basicData: {},
    chartData: {},
    activityData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardMainData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.basicData = action.payload;
      })
      .addCase(getDashboardChartData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chartData = action.payload;
      })
      .addCase(getDashboardActivityData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activityData = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default dashboardSlice.reducer;
