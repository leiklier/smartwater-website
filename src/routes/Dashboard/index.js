import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import queryString from 'query-string'
import { push } from 'connected-react-router'

import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

import Overview from './Overview'
import Nodeview from './Nodeview'
import Graphview from '../../components/GraphviewModal'

import { connect } from 'react-redux'
import { fetchNodes } from '../../redux/actions'

@connect(store => {
	return {
		query: queryString.parse(store.router.location.search),
		nodes: store.nodes.nodes,
		measurements: store.measurements.measurements,
		fetchingNodes: store.nodes.fetching,
		fetchedNodes: store.nodes.fetched,
		errorNodes: store.nodes.error
	}
})
class Dashboard extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const { query, fetchedNodes, nodes, measurements } = this.props
		const { site, nodeId, type } = query

		if (!fetchedNodes) {
			this.props.dispatch(fetchNodes())
		}

		if (
			fetchedNodes &&
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
		} else if (
			fetchedNodes &&
			site === 'graphview' &&
			measurements.length > 0 &&
			(!Object.keys(nodes).includes(nodeId) ||
				!Object.keys(measurements[nodeId]).includes(type))
		) {
			// nodeId or type in query is invalid, so redirect to overview
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
		const { query, fetchedNodes, nodes, measurements } = this.props
		const { site, nodeId, type } = query
		if (
			fetchedNodes &&
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
		const { query, fetchedNodes, measurements, nodes } = this.props
		const { site, nodeId, type, modal } = query

		var currentSite = <Overview nodes={nodes} measurements={measurements} />

		if (
			fetchedNodes &&
			site === 'nodeview' &&
			Object.keys(measurements).includes(nodeId)
		) {
			currentSite = (
				<Nodeview
					nodeId={nodeId}
					nodeData={nodes[nodeId]}
					measurements={measurements[nodeId]}
				/>
			)
		}

		var modalElement = ''
		if (
			fetchedNodes &&
			Object.keys(measurements).includes(nodeId) &&
			Object.keys(measurements[nodeId]).includes(type) &&
			modal === 'graphview'
		) {
			modalElement = (
				<Graphview
					nodeId={nodeId}
					type={type}
					site={site}
					node={nodes[nodeId]}
					graphView={measurements[nodeId][type].graphView}
				/>
			)
		}

		return (
			<Layout style={{ height: '100%' }}>
				{modalElement}
				<Content style={{ height: '100%' }}>{currentSite}</Content>
			</Layout>
		)
	}
}

export default Dashboard
