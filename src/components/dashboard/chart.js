import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { SpinnerInfinity } from 'spinners-react';

const ApexLine4 = ({chartData}) => {

    var data = {
        render: false, //Set render state to false
        series: 
        [
            // {
            //     name: "Yoga",
            //     data: [65, 65, 65, 120, 120],
            // },
        ],
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
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                ],
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

    const [variable, setVariable] = useState(data);

    useEffect(() => {
        setTimeout(function () { //Start the timer
            data.render = true; //After 1 second, set render to true
            setVariable(data);
        }.bind(this), 1000);
    }, []);

    const [renderContainer, setRenderContainer] = useState(false);

    useEffect(() => {
        data.series = chartData.data ? chartData.data : [];
		data.options.xaxis.categories = chartData.category;
        
        var temp = <div id="chart">
            <ReactApexChart
                options={data.options}
                series={data.series}
                type="line"
                height={350}
            />
        </div>;

        setRenderContainer(temp);
    }, [chartData]);


    return (
        <>
        {
            chartData ? (
                renderContainer
            ) : (
                <SpinnerInfinity 
                    size={100}
                />
            )
        }
        </>
    );
}

export default ApexLine4;
