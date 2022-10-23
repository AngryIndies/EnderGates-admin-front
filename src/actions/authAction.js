import axios from "axios";
import { ethers } from "ethers";
import { HOST_URL, AUTHENTICATION, NOT_AUTHENTICATION } from "./types";

const MESSAGEFORSIGNIN = "ENDERSGATE";

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
    var time = Date.now();
    var message = MESSAGEFORSIGNIN + time;
    const sig = await signMessage({
        message: message
    });

    var result = await axios.post( HOST_URL + 'login', {
        data : sig
    });

    localStorage.setItem('EndersGate', result.data.success);
    dispatch({
        type : AUTHENTICATION,
        payload : result.data.success,
    });

    console.log(result.data.success);
    return result.data.success;
    
}

export const onSignout = () => (dispatch) => {
    console.log('EndersGate')
    // localStorage.removeItem('EndersGate');
    localStorage.setItem('EndersGate', false);
    console.log(localStorage.getItem('EndersGate'));
    dispatch({
        type : NOT_AUTHENTICATION,
        payload : false,
    });
    
}

export default {
    onSignin,
    onSignup,
    onSignout,
}