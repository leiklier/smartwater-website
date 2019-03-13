import React, { Component } from 'react'

import { Layout, Icon, PageHeader } from 'antd'
const { Content } = Layout

import NodeCard from '../../../components/NodeCard'

class Overview extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { nodes, measurements } = this.props
		return (
			<Layout>
				<PageHeader title="Overview" />
				<Content>
					{Object.keys(measurements).map(nodeId => {
						return (
							<NodeCard
								key={nodeId}
								nodeId={nodeId}
								node={nodes[nodeId]}
								measurements={measurements[nodeId]}
							/>
						)
					})}
				</Content>
			</Layout>
		)
	}
}

export default Overview
