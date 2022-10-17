import React, {useState, useEffect, useReducer} from "react";
import { connect } from 'react-redux' ;
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import DashboardActiviy from "./activity";
import DashboardHeader from "./header";
import DashboardMainContent from "./content";
import { HOST_URL } from '../../actions/types';

const DashboardIndex = () => {

    const loadCnt = 4;
    const [dashboardInfo, setDashboardInfo] = useState({});
    const [chartData, setChartData]  = useState({});
    const [lastActivities, setLastActivities] = useState([]);
    const [loadMoreCnt, setLoadMoreCnt] = useState(loadCnt);
    const [clickTimeLoadMore, setClickTimeLoadMore] = useState(1);

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
        axios.get( HOST_URL + `getLastActivities?from=0&limit=` + loadMoreCnt).then((res) => {
            setLastActivities(res.data);
        });
    }

    useEffect(() => {
        getLastActivities();
    }, [loadMoreCnt])

    var loadClickCnt = 1;
    const onLoaddMore = () => {
        loadClickCnt++;
        setClickTimeLoadMore(loadClickCnt);
        setLoadMoreCnt(loadMoreCnt * loadClickCnt);
    }

    const onLoadLess = () => {
        setLoadMoreCnt(loadCnt);
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
                        onLoadMore = {onLoaddMore}
                        onLoadLess = {onLoadLess}
                        clickTime = {clickTimeLoadMore}
                    />
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(DashboardIndex);