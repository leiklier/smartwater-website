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
		fetchingNodes: store.nodes.fetching,
		fetchedNodes: store.nodes.fetched,
		errorNodes: store.nodes.error,

		measurements: store.measurements.measurements,
		fetchingMeasurements: store.measurements.fetching,
		fetchedMeasurements: store.measurements.fetched,
		errorMeasurements: store.measurements.error
	}
})
class Dashboard extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const {
			query,
			nodes,
			fetchedNodes,
			measurements,
			fetchedMeasurements
		} = this.props
		const { site, modal, nodeId, type } = query

		// TODO: There is too much hard coding and repetition here,
		// a cleanup is long overdue

		if (!fetchedNodes) {
			this.props.dispatch(fetchNodes())
		}

		if (site && !['nodeview'].includes(site)) {
			// invalid site
			this.props.dispatch(
				push({
					search: queryString.stringify({
						// Intentionally left empty
					})
				})
			)
		}

		if (modal && !['graphview'].includes(modal)) {
			// invalid modal
			this.props.dispatch(
				push({
					search: queryString.stringify({
						// Intentionally left empty
					})
				})
			)
		}

		if (
			fetchedMeasurements &&
			site === 'nodeview' &&
			!Object.keys(measurements).includes(nodeId)
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

		if (
			fetchedMeasurements &&
			modal === 'graphview' &&
			(!Object.keys(measurements).includes(nodeId) ||
				!Object.keys(measurements[nodeId]).includes(type))
		) {
			// nodeid or type in query is invalid, so redirect to overview
			this.props.dispatch(
				push({
					search: querystring.stringify({
						// intentionally left empty
					})
				})
			)
		}
	}

	componentWillUpdate() {
		const {
			query,
			fetchedNodes,
			nodes,
			measurements,
			fetchedMeasurements
		} = this.props
		const { site, modal, nodeId, type } = query

		// TODO: There is too much hard coding and repetition here,
		// a cleanup is long overdue

		if (
			fetchedMeasurements &&
			site === 'nodeview' &&
			!Object.keys(measurements).includes(nodeId)
		) {
			// nodeid in query is invalid, so redirect to overview
			this.props.dispatch(
				push({
					search: querystring.stringify({
						// intentionally left empty
					})
				})
			)
		}

		if (site && !['nodeview'].includes(site)) {
			// invalid site
			this.props.dispatch(
				push({
					search: queryString.stringify({
						// Intentionally left empty
					})
				})
			)
		}

		if (modal && !['graphview'].includes(modal)) {
			// invalid modal
			this.props.dispatch(
				push({
					search: queryString.stringify({
						// Intentionally left empty
					})
				})
			)
		}

		if (
			fetchedMeasurements &&
			modal === 'graphview' &&
			(!Object.keys(measurements).includes(nodeId) ||
				!Object.keys(measurements[nodeId]).includes(type))
		) {
			// nodeId or type in query is invalid, so redirect to overview
			this.props.dispatch(
				push({
					search: querystring.stringify({
						// intentionally left empty
					})
				})
			)
		}
	}

	render() {
		const {
			query,
			nodes,
			fetchedNodes,
			measurements,
			fetchedMeasurements
		} = this.props
		const { site, nodeId, type, modal } = query

		var currentSite = <Overview nodes={nodes} measurements={measurements} />

		if (
			fetchedMeasurements &&
			site === 'nodeview' &&
			Object.keys(measurements).includes(nodeId)
		) {
			currentSite = (
				<Nodeview
					nodeId={nodeId}
					node={nodes[nodeId]}
					measurements={measurements[nodeId]}
				/>
			)
		}

		var modalElement = ''
		if (
			fetchedMeasurements &&
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
