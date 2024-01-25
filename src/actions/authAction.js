import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ethers } from "ethers";
import { HOST_URL, MessageSiningPrefix } from "../config/config";
import { setAuthenticated } from "../reducers/auth.slice";

const signMessage = async ({ message }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const onSignIn = createAsyncThunk(
  "auth/signin",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const time = Date.now();
      const message = MessageSiningPrefix + time;
      const sig = await signMessage({
        message: message,
      });

      const result = await axios.post(HOST_URL + "login", {
        data: sig,
      });

      localStorage.setItem("SignData", JSON.stringify(sig));
      localStorage.setItem(
        "TokenData",
        JSON.stringify({
          success: result.success,
          token: result.token,
          msg: result.msg,
        })
      );

      dispatch(setAuthenticated(result.data.success));

      return result.data;
    } catch (err) {
      console.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const onSignOut = createAsyncThunk("auth/signout", (_, { dispatch }) => {
  localStorage.removeItem("SignData");
  localStorage.removeItem("TokenData");
  dispatch(setAuthenticated(false));
});

export { onSignIn, onSignOut };
