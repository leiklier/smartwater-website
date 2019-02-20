import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchNodes } from '../../../actions/nodesActions'

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
class Nodeview extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return <div>Hello from nodeview!</div>
	}
}

export default Nodeview
