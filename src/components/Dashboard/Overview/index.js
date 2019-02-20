import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchMeasurementsLast } from '../../../actions/measurementsActions'

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
		return <div blabla={this.props.measurements}>Overview</div>
	}
}

export default Overview
