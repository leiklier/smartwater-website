import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchMeasurementsLast } from '../../actions/measurementsActions'

@connect(store => {
	return {
		measurements: store.measurements
	}
})
class NodeCard extends Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		const { nodeId } = this.props
	}
	render() {
		const { nodeId, measurements } = this.props
		return <div>{nodeId}</div>
	}
}

export default NodeCard
