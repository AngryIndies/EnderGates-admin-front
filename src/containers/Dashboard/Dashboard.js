import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardActivityData,
  getDashboardChartData,
  getDashboardMainData,
} from "../../reducers/dashboard.slice";

import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import DashboardActivity from "./DashBoardActivity";
import DashBoardContent from "./DashBoardContent";
import DashboardHeader from "./DashboardHeader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { basicData, chartData, activityData } = useSelector(
    (state) => state.dashboard
  );

  const loadCnt = 4;
  const [loadMoreCnt, setLoadMoreCnt] = useState(loadCnt);
  const [clickTimeLoadMore, setClickTimeLoadMore] = useState(1);

  useEffect(() => {
    dispatch(getDashboardChartData());
    dispatch(getDashboardMainData());
    dispatch(getDashboardActivityData(loadMoreCnt));
  }, [loadMoreCnt, dispatch]);

  const onLoadMore = () => {
    setLoadMoreCnt(
      (prevLoadMoreCnt) => prevLoadMoreCnt * (clickTimeLoadMore + 1)
    );
    setClickTimeLoadMore((prevClickTime) => prevClickTime + 1);
  };

  const onLoadLess = () => {
    setLoadMoreCnt(loadCnt);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <section className="section-container">
        <div className="content-wrapper">
          <DashboardHeader />
          <div className="row">
            <DashBoardContent data={basicData} chartData={chartData} />
            <DashboardActivity
              onLoadMore={onLoadMore}
              onLoadLess={onLoadLess}
              data={activityData}
              clickTime={clickTimeLoadMore}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
