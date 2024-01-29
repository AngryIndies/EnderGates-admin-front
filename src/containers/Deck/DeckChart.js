import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import { SpinnerCircular } from "spinners-react";

const DeckChart = ({ action, reaction, guardian }) => {
  const initChartData = useMemo(
    () => ({
      render: false,
      series: [54, 55, 40],
      options: {
        chart: {
          type: "donut",
          toolbar: {
            show: false,
          },
        },
        labels: ["Blue Stat", "Green Stat", "Green Stat"],
        colors: ["rgba(30,167,197,1)", "rgba(110,197,30,1)", "#f35757"],
        stroke: {
          width: [0],
        },
        legend: {
          position: "top",
          offsetX: -10,
        },
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
      },
    }),
    []
  );

  const [chartData, setChartData] = useState(initChartData);

  useEffect(() => {
    setTimeout(() => {
      const newData = { ...initChartData, render: true };
      setChartData(newData);
    }, 1000);
  }, [initChartData]);

  const [renderContainer, setRenderContainer] = useState(false);

  useEffect(() => {
    initChartData.options.labels = [
      "Action Cards",
      "Reaction Cards",
      "Guardian Cards",
    ];
    initChartData.series = action >= 0 ? [action, reaction, guardian] : [];
    var renderObject =
      action >= 0 ? (
        <div id="chart">
          <ReactApexChart
            options={initChartData.options}
            series={initChartData.series}
            type="donut"
            height={350}
          />
        </div>
      ) : (
        <SpinnerCircular size={90} thickness={180} speed={140} />
      );

    setRenderContainer(renderObject);
  }, [action]);

  return renderContainer;
};

export default DeckChart;
