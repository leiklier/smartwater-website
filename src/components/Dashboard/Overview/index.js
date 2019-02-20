import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchMeasurementsLast } from '../../../actions/measurementsActions'

import { Layout, Icon } from 'antd'
const { Header, Content } = Layout

import NodeCard from './NodeCard'

@connect(store => {
	return {
		nodes: store.nodes.nodes,
		fetchingNodes: store.nodes.fetching,
		fetchedNodes: store.nodes.fetched,
		errorNodes: store.nodes.error,
		measurements: store.measurements
	}
})
class Overview extends Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		const { measurements } = this.props
		for (const nodeId in measurements) {
			this.props.dispatch(fetchMeasurementsLast({ nodeId, initialize: true }))
		}
	}
	componentWillUpdate() {
		const { measurements } = this.props
		for (const nodeId in measurements) {
			this.props.dispatch(fetchMeasurementsLast({ nodeId, initialize: true }))
		}
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
								nodeName={nodes[nodeId].name}
							/>
						)
					})}
				</Content>
			</Layout>
		)
	}
}

export default Overview
