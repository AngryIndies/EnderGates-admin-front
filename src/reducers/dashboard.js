import {
    DASHBOARD_MAIN_DATA,
    DASHBOARD_CHART_DATA, 
    DASHBOARD_ACTIVITY_DATA,
    DECKS_ALL_DATA,
} from '../actions/types';

const initialState = {
    main_data       : {},
    chart_data      : {},
    activity_data   : [],
};

const DashboardReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DASHBOARD_MAIN_DATA : 
            return {
                ...state,
                main_data : payload
            };
        case DASHBOARD_CHART_DATA:
            return {
                ...state,
                chart_data: payload
            };
        case DASHBOARD_ACTIVITY_DATA:
            return {
                ...state,
                activity_data : payload
            }
        default:
            return state;
    }
}

export default DashboardReducer;