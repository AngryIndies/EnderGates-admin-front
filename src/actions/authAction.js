import axios from "axios";
import { ethers } from "ethers";
import { HOST_URL, AUTHENTICATION } from "./types";

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
    var time = Date.now();
    var message = "ENDERSGATE" + time;
    const sig = await signMessage({
        message: message
    });

    var result = await axios.post( HOST_URL + 'login', {
        data : sig
    })

    console.log(result.data);

    localStorage.setItem('EndersGate', result.data.success);

    dispatch({
        type : AUTHENTICATION,
        payload : result.data.success,
    });


}

export const onSignin = async () => {

}

export default {
    onSignin,
    onSignup,
}