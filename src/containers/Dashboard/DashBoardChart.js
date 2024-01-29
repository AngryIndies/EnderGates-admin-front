import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { SpinnerInfinity } from "spinners-react";

const DashBoardChart = ({ chartData }) => {
  const data = {
    render: false, //Set render state to false
    series: [],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },

      stroke: {
        width: [4, 4, 4],
        colors: ["#DD2F6E", "#1EA7C5", "#FF9432"],
        curve: "straight",
      },
      legend: {
        show: false,
      },
      xaxis: {
        type: "text",
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      },
      colors: ["##DD2F6E", "#1EA7C5", "#FF9432"],

      markers: {
        size: [8, 8, 6],
        strokeWidth: [0, 0, 4],
        strokeColors: ["#DD2F6E", "#1EA7C5", "#FF9432"],
        border: 0,
        colors: ["#DD2F6E", "#1EA7C5", "#fff"],
        hover: {
          size: 10,
        },
      },
      yaxis: {
        title: {
          text: "",
        },
      },
    },
  };

  const [renderContainer, setRenderContainer] = useState(null);

  useEffect(() => {
    data.series = chartData.data || [];
    data.options.xaxis.categories = chartData.category;

    setRenderContainer(
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="line"
          height={350}
        />
      </div>
    );
  }, [chartData]);

  return chartData ? renderContainer : <SpinnerInfinity size={100} />;
};

export default DashBoardChart;
