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

@connect(
	store => {
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
	},
	(dispatch, ownProps) => {
		const { fetchedNodes } = ownProps

		return {
			redirectToDashboard: () => {
				dispatch(
					push({
						search: queryString.stringify({
							// Intentionally left empty
						})
					})
				)
			}
		}
	}
)
class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.checkUrl = this.checkUrl.bind(this)
	}

	checkUrl() {
		const {
			query,

			nodes,
			fetchedNodes,

			measurements,
			fetchedMeasurements,

			redirectToDashboard
		} = this.props

		const { site, modal, nodeId, type } = query

		const validSites = ['nodeview']
		const validModals = ['graphview']

		if (site && !validSites.includes(site)) redirectToDashboard()
		if (modal && !validModals.includes(modal)) redirectToDashboard()

		if (
			fetchedMeasurements &&
			site === 'nodeview' &&
			!Object.keys(measurements).includes(nodeId)
		)
			redirectToDashboard()

		if (
			fetchedMeasurements &&
			modal === 'graphview' &&
			(!Object.keys(measurements).includes(nodeId) ||
				!Object.keys(measurements[nodeId]).includes(type))
		)
			redirectToDashboard()
	}

	componentWillMount() {
		this.checkUrl()
	}

	componentWillUpdate() {
		this.checkUrl()
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
					nodes={nodes}
					measurements={measurements[nodeId]}
				/>
			)
		}

		var currentModal = ''
		if (
			fetchedMeasurements &&
			Object.keys(measurements).includes(nodeId) &&
			Object.keys(measurements[nodeId]).includes(type) &&
			modal === 'graphview'
		) {
			currentModal = (
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
				{currentModal}
				<Content style={{ height: '100%' }}>{currentSite}</Content>
			</Layout>
		)
	}
}

export default Dashboard
