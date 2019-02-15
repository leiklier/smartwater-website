import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
	pushMeasurement,
	fetchMeasurementsLast,
	fetchMeasurementsGraphView
} from '../../actions/measurementsActions'

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
	componentDidUpdate() {
		const { nodes, measurements } = this.props
		for (const nodeId in nodes) {
			if (!measurements[nodeId]) this.props.dispatch(pushMeasurement(nodeId))
		}
  }
	render() {
		return <div>Hello from overview!</div>
	}
}

export default Overview
