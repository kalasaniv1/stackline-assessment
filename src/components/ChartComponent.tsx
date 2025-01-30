import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

interface DataProps {
	data: any[];
}

const SplineChart: React.FC<DataProps> = ({ data }) => {

	const aggregateDataByMonth = (data: DataProps[]) => {
		const monthlyAggregates: { [key: string]: number } = {};

		data && data.forEach((item: any) => {
			const date = moment(item.weekEnding).format('MM-DD-YY');
			const yearMonth = moment(date).format('YYYY-MM');
			console.log(yearMonth)

			if (monthlyAggregates[yearMonth]) {
				monthlyAggregates[yearMonth] += item.retailSales;
			} else {
				monthlyAggregates[yearMonth] = item.retailSales;
			}
		});
		console.log(monthlyAggregates)
		return monthlyAggregates
	};

	const aggregatedData = aggregateDataByMonth(data);

	const options = {
		chart: {
			type: 'spline',
		},
		title: {
			text: 'Retail Sales',
		},
		xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', "Sep", "Oct", "Nov", "Dec"],
		},
		yAxis: {
			title: {
				text: 'Values',
			},
		},
		series: [
			{
				data: Object.values(aggregatedData),
			},
		],
	};

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default SplineChart;
