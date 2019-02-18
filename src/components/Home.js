import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { initializeStore } from '../actions/uiActions'

@connect(store => {
	return {
		meaurements: store.measurements
	}
})
class Home extends Component {
	componentWillMount() {
		this.props.dispatch(initializeStore())
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
