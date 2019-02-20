import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Icon } from 'antd'

@connect(store => {
	return {
		measurements: store.measurements
	}
})
class NodeCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}
	render() {
		const { nodeId, nodeName } = this.props
		const measurements = this.props.measurements[nodeId]
		const { loading } = this.state
		return (
			<Card
				style={{ width: '500px', margin: '20px', display: 'inline-block' }}
				title={
					<Link
						style={{ color: 'black' }}
						to={{ search: queryString.stringify({ site: 'nodeview', nodeId }) }}
					>
						<Icon type="arrows-alt" />
						{nodeName}
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
