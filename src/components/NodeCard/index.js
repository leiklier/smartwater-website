import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Icon } from 'antd'

import MeasurementRow from '../MeasurementRow'

import {
	fetchMeasurementsLast,
	subscribeWebsocketMeasurements,
	unsubscribeWebsocketMeasurements
} from '../../redux/actions'

@connect(
	null,
	(dispatch, ownProps) => {
		const { nodeId, measurements } = ownProps

		return {
			fetchMeasurementsLast: () => dispatch(fetchMeasurementsLast({ nodeId })),
			subscribeMeasurements: () =>
				dispatch(
					subscribeWebsocketMeasurements({
						[nodeId]: Object.keys(measurements)
					})
				),
			unsubscribeMeasurements: () =>
				dispatch(
					unsubscribeWebsocketMeasurements({
						[nodeId]: Object.keys(measurements)
					})
				)
		}
	}
)
class NodeCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}

	componentWillMount() {
		const { fetchMeasurementsLast, subscribeMeasurements } = this.props

		subscribeMeasurements()
		fetchMeasurementsLast()
	}

	componentWillUnmount() {
		const { unsubscribeMeasurements } = this.props

		unsubscribeMeasurements()
	}

	render() {
		const { nodeId, node, measurements } = this.props
		const { loading } = this.state

		// Generate MeasurementRows
		var MeasurementRows = new Array()
		const measurementsSettings = node.settings.measurements

		for (const type in measurementsSettings) {
			const lastMeasurement = measurements[type].lastMeasurement

			const {
				value,
				fetching,
				fetched,
				error,
				timeCreated,
				lastFetched
			} = lastMeasurement

			const { format, tooHigh, tooLow } = measurementsSettings[type]

			MeasurementRows.push(
				<MeasurementRow
					key={type}
					nodeId={nodeId}
					type={type}
					value={value}
					format={format}
					tooHigh={tooHigh}
					tooLow={tooLow}
					fetching={fetching}
					fetched={fetched}
					error={error}
					timeCreated={timeCreated}
					lastFetched={lastFetched}
					position={true}
				/>
			)
		}

		return (
			<Card
				style={{
					width: '500px',
					marginLeft: '20px',
					marginTop: '20px',
					display: 'inline-block'
				}}
				title={
					<Link
						style={{ color: 'black' }}
						to={{ search: queryString.stringify({ site: 'nodeview', nodeId }) }}
					>
						{node.name}
						<Icon type="right-square" style={{ marginLeft: '10px' }} />
					</Link>
				}
				loading={loading}
				extra={
					<Link
						to={{ search: queryString.stringify({ site: 'settings', nodeId }) }}
					>
						<Icon type="setting" />
					</Link>
				}
			>
				<h3>Last measurements:</h3>
				{MeasurementRows.map(MeasurementRow => MeasurementRow)}
			</Card>
		)
	}
}

export default NodeCard
