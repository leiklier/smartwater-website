import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import {
	fetchMeasurementsInterval,
	fetchMeasurementsLast
} from '../actions/measurementsActions'

@connect(store => {
	return {
		measurements: store.measurements
	}
})
class Home extends Component {
	componentWillMount() {
		this.props.dispatch(
			fetchMeasurementsInterval({
				nodeId: 1,
				types: ['BATTERY', 'CONDUCTIVITY'],
				fromTimestamp: 1500072925529
			})
		)
		this.props.dispatch(
			fetchMeasurementsLast({
				nodeId: 1,
				types: ['BATTERY']
			})
		)
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
