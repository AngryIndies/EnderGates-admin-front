import {
    CHART_DATA,
} from '../actions/types';

const initialState = {
    chart_data: {},
};

const DashboardReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CHART_DATA:
            return {
                ...state,
                chart_data: {...payload}
            };
        default:
            return state;
    }
}

export default DashboardReducer;