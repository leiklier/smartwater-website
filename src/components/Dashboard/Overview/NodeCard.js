import React, { Component } from 'react'
import { connect } from 'react-redux'

class NodeCard extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return <div>{this.props.nodeId}</div>
	}
}

export default NodeCard
