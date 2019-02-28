import React, { Component } from 'react'

import { Layout, Icon } from 'antd'
const { Header, Content } = Layout

import NodeCard from '../../../components/NodeCard'

class Overview extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { nodes, measurements } = this.props
		return (
			<Layout>
				<Header>
					<h2 style={{ color: 'white', display: 'inline-block' }}>Overview</h2>
				</Header>
				<Content>
					{Object.keys(measurements).map(nodeId => {
						return (
							<NodeCard
								key={nodeId}
								nodeId={nodeId}
								nodeData={nodes[nodeId]}
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
