import axios from 'axios';
import { HOST_URL } from "../config/config";
import {
    DASHBOARD_ACTIVITY_DATA, DASHBOARD_CHART_DATA, DASHBOARD_MAIN_DATA
} from './types';

export const onGetDashboardMainData = () => async (dispatch) => {
    let result = await axios.get(HOST_URL + `getDashboardInfos`);
    dispatch({
        type: DASHBOARD_MAIN_DATA,
        payload: result.data
    })
}

export const onGetDashboardChartData = () => async (dispatch) => {
    let result = await axios.get(HOST_URL + 'getGameCountsByDate');
    dispatch({
        type: DASHBOARD_CHART_DATA,
        payload: result.data
    })
}

export const onGetDashboardActivityData = (loadMoreCnt) => async (dispatch) => {
    let result = await axios.get(HOST_URL + `getLastActivities?from=0&limit=` + loadMoreCnt);
    dispatch({
        type: DASHBOARD_ACTIVITY_DATA,
        payload: result.data
    })
}

export default {
    onGetDashboardMainData,
    onGetDashboardChartData,
    onGetDashboardActivityData,
}