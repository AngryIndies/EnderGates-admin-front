import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";
import { SpinnerCircular } from 'spinners-react';

const ApexPie = ({action, reaction, guardian}) => {

    var data = {
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
            colors: [
                "rgba(30,167,197,1)",
                "rgba(110,197,30,1)",
                "#f35757",
            ],
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
    };

    const [variable, setVariable] = useState(data);

    useEffect(() => {
        setTimeout(function () {
            data.render = true;
            setVariable(data);
        }.bind(this), 1000)
    }, []);

    const [renderContainer, setRenderContainer] = useState(false);

    useEffect(() => {
        data.options.labels = ['Action Cards', 'Reaction Cards', 'Guardian Cards'];
        data.series = action ? [action, reaction, guardian] : [];
        var temp =  action ? (
                                <div id="chart">
                                    <ReactApexChart
                                        options={data.options}
                                        series={data.series}
                                        type="donut"
                                        height={350}
                                    />
                                </div>
                            ) : (
                                <SpinnerCircular 
                                    size={90} 
                                    thickness={180} 
                                    speed={140}
                                />
                            )
        
        setRenderContainer(temp);
    }, [action]);

    return (
        renderContainer
    );
}

const mapStateToProps = (state) => ({
    cards    : state.dashboardReducer.main_data.totalCards,
});

export default connect(mapStateToProps, {})(ApexPie);
