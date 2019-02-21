import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Icon } from 'antd'
import { fetchMeasurementsLast } from '../../../../actions/measurementsActions'

@connect(
	null,
	(dispatch, ownProps) => {
		return {
			initializeStore: () =>
				dispatch(
					fetchMeasurementsLast({ nodeId: ownProps.nodeId, initialize: true })
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
		this.props.initializeStore()
	}
	render() {
		const { nodeId, nodeData, measurements } = this.props
		const { loading } = this.state
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
						<Icon type="arrows-alt" style={{ marginRight: '10px' }} />
						{nodeData.name}
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
				{Object.keys(measurements).map(type => {
					return (
						<p key={type}>
							{type.replace(/_/, ' ').replace(/\w\S*/g, function(txt) {
								return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
							})}
							: {measurements[type].lastMeasurement.value}
						</p>
					)
				})}
			</Card>
		)
	}
}

export default NodeCard
