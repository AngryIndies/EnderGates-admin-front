import axios from "axios";
import {
    HOST_URL,
    DECKS_ALL_DATA
} from "./types";

export const onGetAllDecks = (from, cnt) => async (dispatch) => {
    var result = await axios.get(HOST_URL + 'getAllDecks?from=' + from + '&limit=' + cnt);
    dispatch({
        type: DECKS_ALL_DATA,
        payload: result.data
    });

}

export default {
    onGetAllDecks,
}