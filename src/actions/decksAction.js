import axios from "axios";
import {
    HOST_URL,
    DECKS_ALL_DATA,
    DECKS_DATA,
    DASHBOARD_MAIN_DATA
} from "./types";

export const onGetAllDecks = () => async (dispatch) => {
    var temp = await axios.get( HOST_URL + 'getDashboardInfos');
    var result = await axios.get( HOST_URL + 'getAllDecks?from=0&limit=' + temp.data.totalDecks);

    dispatch({
        type : DASHBOARD_MAIN_DATA,
        payload : temp.data
    })

    dispatch({
        type : DECKS_ALL_DATA,
        payload : result.data
    })
};

export const onGetDecks = (from, cnt) => async (dispatch) => {
    var result = await axios.get(HOST_URL + 'getAllDecks?from=' + from + '&limit=' + cnt);
    dispatch({
        type: DECKS_DATA,
        payload: result.data
    });

};

export default {
    onGetAllDecks,
    onGetDecks,
}