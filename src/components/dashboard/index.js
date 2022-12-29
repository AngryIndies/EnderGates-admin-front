import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";

import { onGetDashboardActivityData, onGetDashboardChartData, onGetDashboardMainData } from "../../actions/dashboardAction";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import DashboardActiviy from "./activity";
import DashboardMainContent from "./content";
import DashboardHeader from "./header";

const DashboardIndex = ({
    onGetDashboardMainData,
    onGetDashboardChartData,
    onGetDashboardActivityData,
    isAuthenticated,
    dashboardReducer_main,
    dashboardReducer_chart,
    dashboardReducer_activity
}) => {

    const loadCnt = 4;
    const [loadMoreCnt, setLoadMoreCnt] = useState(loadCnt);
    const [clickTimeLoadMore, setClickTimeLoadMore] = useState(1);

    useEffect(() => {
        onGetDashboardMainData();
        onGetDashboardChartData();
        onGetDashboardActivityData(loadMoreCnt);
    }, [loadMoreCnt, onGetDashboardActivityData, onGetDashboardChartData, onGetDashboardMainData]);

    useEffect(() => {
        onGetDashboardActivityData(loadMoreCnt);
    }, [loadMoreCnt, onGetDashboardActivityData])

    var loadClickCnt = 1;
    const onLoaddMore = () => {
        loadClickCnt++;
        setClickTimeLoadMore(loadClickCnt);
        setLoadMoreCnt(loadMoreCnt * loadClickCnt);
    }

    const onLoadLess = () => {
        setLoadMoreCnt(loadCnt);
    }

    if (!isAuthenticated) {
        console.log('navigation');
        return <Navigate to="/" />
    }

    return (
        <>
            <Header />
            <Sidebar />
            <section className="section-container">
                <div className="content-wrapper">
                    <DashboardHeader />
                    <div className="row">
                        <DashboardMainContent
                            data={dashboardReducer_main}
                            chartData={dashboardReducer_chart}
                        />
                        <DashboardActiviy
                            onLoadMore={onLoaddMore}
                            onLoadLess={onLoadLess}
                            data={dashboardReducer_activity}
                            clickTime={clickTimeLoadMore}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    dashboardReducer_main: state.dashboardReducer.main_data,
    dashboardReducer_chart: state.dashboardReducer.chart_data,
    dashboardReducer_activity: state.dashboardReducer.activity_data,
});

export default connect(mapStateToProps, {
    onGetDashboardMainData,
    onGetDashboardChartData,
    onGetDashboardActivityData,
})(DashboardIndex);