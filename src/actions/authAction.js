import axios from "axios";
import { ethers } from "ethers";
import { HOST_URL, AUTHENTICATION, NOT_AUTHENTICATION } from "./types";

const MESSAGEFORSIGNIN = "Endersgate-Admin-";

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
            address
        };
    } catch (err) {
        console.log(err.message);
    }
};

export const onSignup = () => async (dispatch) => {

}

export const onSignin = () => async (dispatch) => {
    const time = Date.now();
    const message = MESSAGEFORSIGNIN + time;
    const sig = await signMessage({
        message: message
    });

    const result = await axios.post(HOST_URL + 'login', {
        data: sig
    });

    localStorage.setItem("SignData", JSON.stringify(sig));
    localStorage.setItem("TokenData", JSON.stringify({
        success: result.success,
        token: result.token,
        msg: result.msg
    }));

    if (result.data.success) {
        dispatch({
            type: AUTHENTICATION,
            payload: result.data,
        });
    }

    return result.data;
}

export const onSignout = () => (dispatch) => {
    localStorage.removeItem('SignData');
    localStorage.removeItem('TokenData');
    dispatch({
        type: NOT_AUTHENTICATION,
        payload: false,
    });

}

export default {
    onSignin,
    onSignup,
    onSignout,
}