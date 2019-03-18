import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card } from 'antd'

import LastMeasurementRow from '../LastMeasurementRow'
import MeasurementsChart from '../MeasurementsChart'
import AggregatesMeasurementTable from '../AggregatesMeasurementTable'

import { fetchMeasurementsQuickView } from '../../redux/actions'

@connect(
	store => {
		return {
			mode: store.sites.nodeview.mode
		}
	},
	(dispatch, ownProps) => {
		const { nodeId, type } = ownProps
		return {
			fetchQuickView: () => {
				dispatch(fetchMeasurementsQuickView(nodeId, [type]))
			}
		}
	}
)
class MeasurementCard extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { measurement, fetchQuickView } = this.props
		const { quickView } = measurement
		if (!quickView.fetched && !quickView.fetching) fetchQuickView()
	}

	render() {
		const { mode, nodeId, node, type, measurement } = this.props
		const { lastMeasurement, quickView } = measurement
		const measurementSettings = node.settings.measurements[type]
		const aggregates = measurement.aggregates

		var mainContent
		switch (mode) {
			case 'quickview': {
				mainContent = (
					<MeasurementsChart
						measurementsCollection={[
							{ nodeName: node.name, data: quickView.data }
						]}
						loading={quickView.fetching}
					/>
				)
				break
			}

			case 'aggregatesTable': {
				mainContent = (
					<AggregatesMeasurementTable
						nodeId={nodeId}
						type={type}
						measurementSettings={measurementSettings}
						aggregates={aggregates}
					/>
				)
				break
			}

			default: {
				mainContent = 'Something went wrong'
			}
		}

		return (
			<Card
				style={{
					width: '500px',
					marginLeft: '20px',
					marginTop: '10px',
					display: 'inline-block'
				}}
			>
				{/*This will be the "title" of the card*/}
				<LastMeasurementRow
					nodeId={nodeId}
					type={type}
					lastMeasurement={lastMeasurement}
					measurementSettings={measurementSettings}
				/>
				{mainContent}
			</Card>
		)
	}
}

export default MeasurementCard
