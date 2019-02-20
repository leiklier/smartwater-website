import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Layout, Icon } from 'antd'
const { Header, Content } = Layout

import {
	MEASUREMENT_INTERVALS,
	VALID_AGGREGATES
} from '../../../config/constants'
import { fetchMeasurementsAggregate } from '../../../actions/measurementsActions'

@connect(store => {
	return {
		measurements: store.measurements
	}
})
class Nodeview extends Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		const { nodeId } = this.props

		for (const intervalName in MEASUREMENT_INTERVALS) {
			for (const aggregate of VALID_AGGREGATES) {
				this.props.dispatch(
					fetchMeasurementsAggregate(nodeId, aggregate, intervalName)
				)
			}
		}
	}
	render() {
		const { nodeId, nodeName } = this.props
		return (
			<Layout>
				<Header style={{ paddingLeft: 0 }}>
					<Link style={{ color: 'grey', marginRight: '20px' }} to="/dashboard">
						<Icon
							type="left"
							style={{ marginLeft: '15px', marginRight: '10px' }}
						/>
						Back to Overview
					</Link>
					<h2 style={{ color: 'white', display: 'inline-block' }}>
						{nodeName}
					</h2>
				</Header>
				<Content>bewdfjbnsdo</Content>
			</Layout>
		)
	}
}

export default Nodeview
