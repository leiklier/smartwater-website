import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import queryString from 'query-string'
import { push } from 'connected-react-router'

import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

import Overview from './Overview'
import Nodeview from './Nodeview'

import { connect } from 'react-redux'
import { fetchNodes } from '../../actions/nodesActions'

@connect(store => {
	return {
		query: queryString.parse(store.router.location.search),
		nodes: store.nodes.nodes,
		measurements: store.measurements,
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
		const { query, fetched, nodes } = this.props
		const { site, nodeId } = query
		if (!fetched) {
			this.props.dispatch(fetchNodes())
		}
		if (
			fetched &&
			site === 'nodeview' &&
			!Object.keys(nodes).includes(nodeId)
		) {
			// nodeId inn query is invalid, so redirect to overview
			this.props.dispatch(
				push({
					search: queryString.stringify({
						// Intentionally left empty
					})
				})
			)
		}
	}
	componentWillUpdate() {
		const { query, fetched, nodes } = this.props
		const { site, nodeId } = query
		if (
			fetched &&
			site === 'nodeview' &&
			!Object.keys(nodes).includes(nodeId)
		) {
			// nodeId in query is invalid, so redirect to overview
			this.props.dispatch(
				push({
					search: queryString.stringify({
						// Intentionally left empty
					})
				})
			)
		}
	}
	render() {
		const { query, fetched, measurements, nodes } = this.props
		const { site, nodeId } = query

		var currentSite = <Overview />

		if (
			fetched &&
			site === 'nodeview' &&
			Object.keys(measurements).includes(nodeId)
		) {
			currentSite = <Nodeview nodeId={nodeId} nodeName={nodes[nodeId].name}/>
		}

		return (
			<Layout style={{ height: '100%' }}>
				<Content style={{ height: '100%' }}>{currentSite}</Content>
			</Layout>
		)
	}
}

export default Dashboard
