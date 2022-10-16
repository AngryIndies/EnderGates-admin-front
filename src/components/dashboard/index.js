import React, {useState, useEffect, useReducer} from "react";
import { connect } from 'react-redux' ;
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import DashboardActiviy from "./activity";
import DashboardHeader from "./header";
import DashboardMainContent from "./content";
import { HOST_URL } from '../../actions/types';

const DashboardIndex = () => {
    
    const [dashboardInfo, setDashboardInfo] = useState({});
    const [chartData, setChartData]  = useState({});
    const [lastActivities, setLastActivities] = useState([]);

    useEffect(() => {
        getDashboardInfos();
        getChartData();
        getLastActivities();
    }, []);

    const getDashboardInfos = () => {
        axios.get( HOST_URL + `getDashboardInfos`).then( res => {
            setDashboardInfo(res.data);
        });
    }

    const getChartData = () => {
        axios.get(HOST_URL + 'getGameCountsByDate').then((res) => {
            setChartData(res.data);
        });
    }

    const getLastActivities = () => {
        axios.get( HOST_URL + `getLastActivities`).then((res) => {
            setLastActivities(res.data);
        });
    }

    return (
        <section className="section-container">
            <div className="content-wrapper">
                <DashboardHeader/>
                <div className="row">
                    <DashboardMainContent
                        data = {dashboardInfo}
                        chartData  = {chartData}
                    />
                    <DashboardActiviy
                        data={lastActivities}
                    />
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(DashboardIndex);