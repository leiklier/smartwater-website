import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import {
	pushMeasurement,
	fetchMeasurementsInterval,
	fetchMeasurementsLast,
	fetchMeasurementsAggregate
} from '../actions/measurementsActions'

import { fetchNodes } from '../actions/nodesActions'

@connect(store => {
	return {
		measurements: store.measurements,
		nodes: store.nodes
	}
})
class Home extends Component {
	componentWillMount() {
		this.props.dispatch(fetchNodes())
		// this.props.dispatch(pushMeasurement(1))
		// this.props.dispatch(
		// 	fetchMeasurementsInterval({
		// 		nodeId: 1,
		// 		types: ['BATTERY', 'CONDUCTIVITY'],
		// 		fromTimestamp: 1500072925529
		// 	})
		// )
		// this.props.dispatch(
		// 	fetchMeasurementsLast({
		// 		nodeId: 1,
		// 		types: ['BATTERY']
		// 	})
		// )
		// this.props.dispatch(
		// 	fetchMeasurementsAggregate({
		// 		nodeId: 1,
		// 		intervalName: 'lastWeek',
		// 		types: ['BATTERY'],
		// 		aggregate: 'HIGHEST'
		// 	})
		// )
	}
	render() {
		return (
			<p>
				This is the home page.
				<Link to="/about">About</Link>
			</p>
		)
	}
}

export default Home
