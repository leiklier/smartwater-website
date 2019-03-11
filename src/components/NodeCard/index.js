import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Icon, Typography } from 'antd'
const { Title } = Typography

import LastMeasurementRow from '../LastMeasurementRow'

import {
	fetchMeasurementsLast,
	subscribeWebsocketMeasurements,
	unsubscribeWebsocketMeasurements
} from '../../redux/actions'

class NodeCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}

	render() {
		const { nodeId, node, measurements } = this.props
		const { loading } = this.state

		const measurementsSettings = node.settings.measurements

		// Generate Rows
		var Rows = new Object() // key=purpose
		for (const type in measurementsSettings) {
			const lastMeasurement = measurements[type].lastMeasurement
			const { purpose } = measurementsSettings[type]

			if (!Rows[purpose]) Rows[purpose] = new Array()
			Rows[purpose].push(
				<LastMeasurementRow
					key={type}
					nodeId={nodeId}
					type={type}
					lastMeasurement={lastMeasurement}
					measurementSettings={measurementsSettings[type]}
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
						to={{
							search: queryString.stringify({ site: 'nodeview', nodeId })
						}}
					>
						<Title level={3}>
							{node.name}
							<Icon type="right-circle" style={{ marginLeft: '10px' }} />
						</Title>
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
				<Title level={4}>Status:</Title>
				{Rows.STATUS.map(LastMeasurementRow => LastMeasurementRow)}

				<Title level={4}>Last measurements:</Title>
				{Rows.SENSOR.map(LastMeasurementRow => LastMeasurementRow)}
			</Card>
		)
	}
}

export default NodeCard
