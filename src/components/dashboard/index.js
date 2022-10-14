import React, {useState, useEffect, useReducer} from "react";
import { connect } from 'react-redux' ;
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import RightSidebar from "./sidebar";
import DashboardHeader from "./header";
import DashboardMainContent from "./content";
import {HOST_URL} from '../../actions/types';

const DashboardIndex = () => {
    
    const [dashboardInfo, setDashboardInfo] = useState({});
    const [chartData, setChartData]  = useState({});

    useEffect(() => {
        getDashboardInfos();
        getChartData();
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

    return (
        <section className="section-container">
            <div className="content-wrapper">
                <DashboardHeader/>
                <div className="row">
                    <DashboardMainContent
                        data = {dashboardInfo}
                        chartData  = {chartData}
                    />
                    <RightSidebar/>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(DashboardIndex);