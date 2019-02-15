import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { Card, Row, Col, Tabs, Table } from 'antd'
const TabPane = Tabs.TabPane

import Aside from './Aside'
import Overview from './Overview'
import NodeView from './NodeView'

import { connect } from 'react-redux'
import { fetchNodes } from '../../actions/nodesActions'

@connect(store => {
	return {
		pageVisiting: `/${store.router.location.pathname.split('/')[1]}`,
		nodes: store.nodes.nodes,
		fetching: store.nodes.fetching,
		fetched: store.nodes.fetched,
		error: store.nodes.error
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
		const { pageVisiting, nodes, fetching, fetched, error } = this.props
		return (
			<div>
				<Aside
					nodes={nodes}
					fetching={fetching}
					fetched={fetched}
					error={error}
				/>
				<Switch>
					<Route exact path={pageVisiting} component={Overview} />
					<Route path={`${pageVisiting}/nodeview`} component={NodeView} />
				</Switch>
			</div>
		)
	}
}

export default Dashboard
