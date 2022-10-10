import React, {useState, useEffect, useReducer} from "react";
import { connect } from 'react-redux' ;
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

// import { CHART_DATA } from '../../actions/types';
// import allActions from "../../actions";

import { onGetChartData } from "../../actions/dashboardAction";

import RightSidebar from "./sidebar";
import DashboardHeader from "./header";
import DashboardMainContent from "./content";
import {HOST_URL} from '../../actions/types';

const DashboardIndex = ({onGetChartData}) => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCards, setTotalCards] = useState(0);
    const [totalGames, setTotalGames] = useState(0);
    const [totalPacks, setTotalPacks] = useState(0);
    const [chartData, setChartData]  = useState({});

    useEffect(() => {
        getTotalUsers();
        getTotalCards();
        getTotalGames();
        getTotalPacks();
        getChartData();
    }, []);

    const getTotalUsers = () => {
        axios.get( HOST_URL + `getPlayerCount`).then(res => {
            setTotalUsers(res.data.count);
        });
    }

    const getTotalCards = () => {
        axios.get( HOST_URL + `getCardsCount`).then(res => {
            var cards = res.data.guardianCards + res.data.actionCards + res.data.reactionCards;
            setTotalCards(cards);
        });
    }

    const getTotalGames = () => {
        axios.get( HOST_URL + `getTotalGamesCount`).then(res => {
            setTotalGames(res.data.totalGames);
        });
    }

    const getTotalPacks = () => {
        axios.get( HOST_URL + `getTotalGamesCount`).then(res => {
            setTotalPacks(1268);
        });
    }

    const getChartData = () => {
        axios.get(HOST_URL + 'getGameCountsByDate').then((res) => {
            setChartData(res.data);
        });
    }

    // const chart_data = useSelector(({dashboard}) => dashboard.chart_data);

    return (
        <section className="section-container">
            <div className="content-wrapper">
                <DashboardHeader/>
                <div className="row">
                    <DashboardMainContent
                        totalUsers = {totalUsers}
                        totalCards = {totalCards}
                        totalGames = {totalGames}
                        totalPacks = {totalPacks}
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

export default connect(mapStateToProps, {onGetChartData})(DashboardIndex);