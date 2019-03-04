import React, { Component } from 'react'

import { Line } from 'react-chartjs-2'

class MeasurementsChart extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { measurementsCollection, loading } = this.props
		const datasets = new Array()

		for (const measurements of measurementsCollection) {
			const data = new Array()

			for (const measurement of measurements.data) {
				data.push({
					t: measurement.timeCreated,
					y: measurement.value
				})
			}

			datasets.push({
				label: measurements.nodeName,
				data
			})
		}

		return (
			<Line
				data={{
					datasets
				}}
				options={{
					scales: {
						xAxes: [
							{
								type: 'time'
							}
						]
					}
				}}
			/>
		)
	}
}

export default MeasurementsChart
