import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Icon } from 'antd'

import { fetchMeasurementGraphView } from '../../../../actions/measurementsActions'

@connect(store => {
	return {
		measurements: store.measurements
	}
})
class MeasurementCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}

	render() {
		const { nodeId, type } = this.props
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
							search: queryString.stringify({ site: 'graphview', nodeId, type })
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
					{this.props.measurements[nodeId][type].lastMeasurement.value}
				</p>
				<h3>Aggregates:</h3>
				{Object.keys(this.props.measurements[nodeId][type].aggregates).map(
					intervalName => {
						return (
							<div key={intervalName}>
								<h4>{intervalName}</h4>
								{Object.keys(
									this.props.measurements[nodeId][type].aggregates[intervalName]
								).map(aggregate => {
									if (aggregate !== 'duration' && aggregate !== 'textDisplay')
										return (
											<span key={intervalName + aggregate}>
												{aggregate}:{' '}
												{
													this.props.measurements[nodeId][type].aggregates[
														intervalName
													].value
												}
											</span>
										)
									else return ''
								})}
							</div>
						)
					}
				)}
			</Card>
		)
	}
}

export default MeasurementCard
