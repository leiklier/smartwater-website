import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Card, Row, Col, Tabs, Table } from 'antd'
const TabPane = Tabs.TabPane

import Aside from './Aside'

import { connect } from 'react-redux'
import { fetchNodes } from '../../actions/nodesActions'

@connect(store => {
	return {
		nodes: store.nodes
	}
})
class Dashboard extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.dispatch(fetchNodes())
	}
	render() {
		const { nodes } = this.props
		return (
			<div>
				<Aside nodes={nodes} />
			</div>
		)
	}
}

export default Dashboard
