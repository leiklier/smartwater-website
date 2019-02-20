import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Icon } from 'antd'

@connect()
class MeasurementCard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { nodeId, type } = this.props
		return <div>{nodeId + type}</div>
	}
}

export default MeasurementCard
