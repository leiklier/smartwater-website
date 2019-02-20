import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Layout, Icon, Row, Col, DatePicker } from 'antd'
const { Header, Content } = Layout
const { RangePicker } = DatePicker
import moment from 'moment'

import { fetchMeasurementsGraphView } from '../../../actions/measurementsActions'

@connect(store => {
	return {
		nodesFetched: store.nodes.fetched,
		measurements: store.measurements
	}
})
class Graphview extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { nodeId, nodeName, type, measurements } = this.props
		var { fromTimestamp, toTimestamp } = measurements[nodeId][type].graphView
		toTimestamp = toTimestamp || Date.now()
		return (
			<Layout>
				<Header style={{ paddingLeft: 0 }}>
					<Link
						style={{ color: 'grey', marginRight: '20px' }}
						to={{ search: queryString.stringify({ site: 'nodeview', nodeId }) }}
					>
						<Icon
							type="left"
							style={{ marginLeft: '15px', marginRight: '10px' }}
						/>
						Back to {nodeName}
					</Link>
					<h2 style={{ color: 'white', display: 'inline-block' }}>
						{type.replace(/_/, ' ').replace(/\w\S*/g, function(txt) {
							return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
						})}
					</h2>
				</Header>
				<Content>
					<Row>
						<Col span={12} offset={6} style={{ textAlign: 'center' }}>
							<span>From/to: </span>
							<RangePicker
								defaultValue={[moment(fromTimestamp), moment(toTimestamp)]}
								onChange={(date, dateString) => {
									if (date[0] && date[1]) {
										const toTimestamp =
											moment().isAfter(date[1]) &&
											moment().format('DD/MM/YYYY') !==
												date[1].format('DD/MM/YYYY')
												? date[1].unix()
												: false
										this.props.dispatch(
											fetchMeasurementsGraphView({
												nodeId,
												type,
												fromTimestamp: date[0].unix(),
												toTimestamp
											})
										)
									}
								}}
							/>
						</Col>
					</Row>
				</Content>
			</Layout>
		)
	}
}

export default Graphview
