import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Icon } from 'antd'
import { fetchMeasurementsLast } from '../../redux/actions'

@connect(
	null,
	(dispatch, ownProps) => {
		const { nodeId } = ownProps
		return {
			initializeStore: () => dispatch(fetchMeasurementsLast({ nodeId }))
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
						{nodeData.name}
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
				{Object.keys(measurements).map(type => {
					const { value, fetched } = measurements[type].lastMeasurement
					return (
						<Link
							style={{ color: 'black' }}
							to={{
								search: queryString.stringify({
									nodeId,
									type,
									modal: 'graphview'
								})
							}}
						>
							<p key={type}>
								<Icon type="arrows-alt" style={{ marginRight: '10px' }} />
								{type.replace(/_/, ' ').replace(/\w\S*/g, function(txt) {
									return (
										txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
									)
								})}
								: {fetched ? value : <Icon type="loading" />}
							</p>
						</Link>
					)
				})}
			</Card>
		)
	}
}

export default NodeCard
