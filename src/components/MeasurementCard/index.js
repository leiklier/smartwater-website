import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Icon } from 'antd'

import {
	fetchMeasurementsLast,
	fetchMeasurementsAggregate
} from '../../redux/actions'

@connect(
	null,
	(dispatch, ownProps) => {
		const { nodeId, type, measurement } = ownProps
		const { aggregates } = measurement
		return {
			initializeStore: () => {
				dispatch(
					fetchMeasurementsLast({
						nodeId,
						types: [type]
					})
				)
				for (const intervalName in aggregates) {
					for (const aggregate in aggregates[intervalName]) {
						if (aggregate !== 'duration' && aggregate !== 'textDisplay') {
							dispatch(
								fetchMeasurementsAggregate(nodeId, aggregate, intervalName, [
									type
								])
							)
						}
					}
				}
			},
			fetchAggregates: () => {
				for (const intervalName in aggregates) {
					for (const aggregate in aggregates[intervalName]) {
						if (aggregate !== 'duration' && aggregate !== 'textDisplay') {
							dispatch(
								fetchMeasurementsAggregate(nodeId, aggregate, intervalName, [
									type
								])
							)
						}
					}
				}
			}
		}
	}
)
class MeasurementCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			aggregateIntervalId: false,
			aggregateIntervalDelay: 30 * 1000
		}
	}

	componentWillMount() {
		this.props.initializeStore()
		var aggregateIntervalId = setInterval(
			this.props.fetchAggregates,
			this.state.aggregateIntervalDelay
		)
		this.setState({ aggregateIntervalId })
	}
	componentWillUnmount() {
		clearInterval(this.state.aggregateIntervalId)
	}

	render() {
		const { nodeId, type, measurement } = this.props
		const { lastMeasurement } = measurement

		const { loading } = this.state

		return (
			<Card
				style={{
					width: '500px',
					marginLeft: '20px',
					marginTop: '10px',
					display: 'inline-block'
				}}
				title={
					<Link
						style={{ color: 'black' }}
						to={{
							search: queryString.stringify({
								site: 'nodeview',
								nodeId,
								type,
								modal: 'graphview'
							})
						}}
					>
						<Icon type="arrows-alt" style={{ marginRight: '10px' }} />
						{type.replace(/_/, ' ').replace(/\w\S*/g, function(txt) {
							return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
						})}
					</Link>
				}
				loading={loading}
				extra={
					<Link
						to={{
							search: queryString.stringify({ site: 'settings', nodeId, type })
						}}
					>
						<Icon type="setting" />
					</Link>
				}
			>
				<p>
					Last measurement:{' '}
					{lastMeasurement.fetched ? (
						lastMeasurement.value
					) : (
						<Icon type="loading" />
					)}
				</p>
				<h3>Aggregates:</h3>
				{Object.keys(measurement.aggregates).map(intervalName => {
					return (
						<div key={intervalName}>
							<h4>{measurement.aggregates[intervalName].textDisplay}</h4>
							{Object.keys(measurement.aggregates[intervalName]).map(
								aggregate => {
									if (aggregate !== 'duration' && aggregate !== 'textDisplay') {
										const aggregateData =
											measurement.aggregates[intervalName][aggregate]
										return (
											<span key={intervalName + aggregate}>
												{aggregate}:{' '}
												{aggregateData.fetched ? (
													aggregateData.value
												) : (
													<Icon type="loading" />
												)}
											</span>
										)
									} else return ''
								}
							)}
						</div>
					)
				})}
			</Card>
		)
	}
}

export default MeasurementCard
