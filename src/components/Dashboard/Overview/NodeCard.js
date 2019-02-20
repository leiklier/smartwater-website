import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Icon } from 'antd'

class NodeCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}
	render() {
		const { nodeId, nodeName } = this.props
		const { loading } = this.state
		return (
			<Card
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
        Content
			</Card>
		)
	}
}

export default NodeCard
