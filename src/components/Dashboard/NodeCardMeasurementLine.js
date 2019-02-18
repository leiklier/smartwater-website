import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMeasurementsLast } from '../../actions/measurementsActions'

@connect(store => {
	return {
		measurements: store.measurements
	}
})
class NodeCardMeasurementLine extends Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		const { nodeId, type } = this.props
		this.props.dispatch(fetchMeasurementsLast(nodeId, type))
	}
	render() {
		const { nodeId, type, measurements } = this.props
		return (
			<div>
				{measurements[nodeId][type].lastMeasurement.fetched
					? measurements[nodeId][type].lastMeasurement.value
					: ''}
			</div>
		)
	}
}

export default NodeCardMeasurementLine
