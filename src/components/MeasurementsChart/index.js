import React, { Component } from 'react'

import { Line } from 'react-chartjs-2'
import { Spin, Icon } from 'antd'

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
			<Spin
				indicator={<Icon type="loading" style={{ fontSize: '5vw' }} spin />}
				size="large"
				delay={500}
				spinning={loading}
			>
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
						},
						elements: {
							line: {
								tension: 0 // Disables bezier line smoothing
							}
						}
					}}
				/>
			</Spin>
		)
	}
}

export default MeasurementsChart
