import { ethers } from "ethers";

const signMessage = async ({ message }) => {

    try {
        console.log({ message });
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

export const onSignup = async () => {
    var time = Date.now();
    var message = "ENDERSGATE" + time;
    const sig = await signMessage({
        message: message
    });

    console.log(sig);
}

export const onSignin = async () => {

}

export default {
    onSignin,
    onSignup,
}