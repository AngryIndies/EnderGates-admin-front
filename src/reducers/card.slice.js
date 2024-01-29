import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { HOST_URL } from "../config/config";

const initialState = {
  cardsInfo: {},
  cardsInfoLoading: false,

  cardsMetadata: [],
  cardsMetadataLoading: false,
};

export const getCardsInfo = createAsyncThunk("card/getCardsInfo", async () => {
  const result = await axios.get(`${HOST_URL}cardsInfo`);

  return { cardsInfo: result.data };
});

export const getMetadata = createAsyncThunk("card/getMetadata", async () => {
  const result = await axios.get(`${HOST_URL}getMetadata`);

  return { metadata: result.data.metadatas };
});

const cardSlice = createSlice({
  name: "card",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCardsInfo.pending, (state) => {
      state.cardsInfoLoading = true;
    });
    builder.addCase(getCardsInfo.fulfilled, (state, { payload }) => {
      state.cardsInfo = payload.cardsInfo;
      state.cardsInfoLoading = false;
    });
    builder.addCase(getCardsInfo.rejected, (state, { error }) => {
      console.log(error);
      state.cardsInfo = [];
      state.cardsInfoLoading = false;
    });

    builder.addCase(getMetadata.pending, (state) => {
      state.cardsMetadataLoading = true;
    });

    builder.addCase(getMetadata.fulfilled, (state, { payload }) => {
      state.cardsMetadata = payload.metadata;
      state.cardsMetadataLoading = false;
    });

    builder.addCase(getMetadata.rejected, (state, { error }) => {
      console.log(error);
      state.cardsMetadata = [];
      state.cardsMetadataLoading = false;
    });
  },
});

export const {} = cardSlice.actions;

export default cardSlice.reducer;
