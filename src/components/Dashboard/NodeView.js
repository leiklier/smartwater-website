import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchNodes } from '../../actions/nodesActions'
import { pushMeasurement } from '../../actions/measurementsActions'

@connect(store => {
	return {
		nodes: store.nodes.nodes,
		fetching: store.nodes.fetching,
		fetched: store.nodes.fetched,
		error: store.nodes.error,
		measurements: store.measurements,
		nodeId: `${store.router.location.pathname.split('/')[3]}`
	}
})
class NodeView extends Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		const { fetched, measurements, nodeId } = this.props
		if (!fetched) {
			this.props.dispatch(fetchNodes())
		}
		if (!measurements[nodeId]) {
			this.props.dispatch(pushMeasurement(nodeId))
		}
	}

	render() {
		return <div>Hello from nodeview!</div>
	}
}

export default NodeView
