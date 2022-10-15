import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Apexchartrevenue = ({ chartData }) => {

	var data = {
		render: false, //Set render state to false
		series: [{
			name: 'Game play',
			data: chartData.data
		}, {
			name: 'New Users',
			data: [11, 32, 45, 32, 34]
		}],
		options: {
			chart: {
				height: 350,
				type: 'area',
				toolbar: {
					show: false
				}

			},
			colors: ['#343a40', '#f4201c', '#f35757'],
			dataLabels: {
				enabled: false,
			},
			legend: {
				show: true,
				fontSize: '12px',

				labels: {
					colors: '#000000',

				},
				position: 'bottom',
				horizontalAlign: 'center',
				markers: {
					width: 19,
					height: 19,
					strokeWidth: 0,
					strokeColor: '#fff',
					fillColors: undefined,
					radius: 4,
					offsetX: 0,
					offsetY: 0
				}
			},
			xaxis: {

				categories: chartData.category,
				labels: {
					style: {
						colors: '#3e4954',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 100,
						cssClass: 'apexcharts-xaxis-label',
					},
				},
				crosshairs: {
					show: false,
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: '#3e4954',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 100,
						cssClass: 'apexcharts-xaxis-label',
					},
				},
			},
			fill: {
				type: 'solid',
				opacity: 0.8,
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return "" + val + " "
					}
				}
			}
		},
	};

	const [variable, setVariable] = useState(data);

	useEffect(() => {
		setTimeout(function () { //Start the timer
			data.render = true;
			setVariable(data); //After 1 second, set render to true
		}.bind(this), 1000)
	});

	const [renderContainer, setRenderContainer] = useState(false);

	useEffect(() => {
		data.series.data = chartData.data;
		data.options.xaxis.categories = chartData.category;

		var temp = <div id="chart">
			<ReactApexChart options={data.options} series={data.series} type="area" height={440} />
		</div>;

		setRenderContainer(temp);

	}, [chartData]);

	return (
		renderContainer
	);
}

export default Apexchartrevenue;
