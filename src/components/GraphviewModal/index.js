import React, { Component } from 'react'
import { Modal, DatePicker, Switch, Button, Icon, Row, Col } from 'antd'
const { RangePicker } = DatePicker

import MeasurementsChart from '../MeasurementsChart'

import queryString from 'query-string'

import { goBack } from 'connected-react-router'
import { connect } from 'react-redux'

import moment from 'moment'

import { fetchMeasurementsGraphView } from '../../redux/actions'
import { downloadAsCsv } from '../../controllers'

@connect(
	null,
	(dispatch, ownProps) => {
		const { nodeId, type, site } = ownProps
		return {
			handleClose: () =>
				dispatch(
					goBack({
						search: queryString.stringify({
							nodeId,
							type,
							site
						})
					})
				),
			fetchGraphView: function(args = {}) {
				const { fromTimestamp, toTimestamp } = args
				dispatch(
					fetchMeasurementsGraphView({
						nodeId,
						types: [type],
						fromTimestamp,
						toTimestamp
					})
				)
			}
		}
	}
)
class Graphview extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const { graphView, fetchGraphView } = this.props
		if (!graphView.fetched) fetchGraphView()
	}

	render() {
		const {
			nodeId,
			type,
			site,
			node,
			graphView,
			handleClose,
			fetchGraphView
		} = this.props
		const { fromTimestamp, toTimestamp, fetching } = graphView

		const liveReload = !graphView.toTimestamp

		const chartDataY = graphView.data.map(measurement => measurement.value)
		const chartDataX = graphView.data.map(
			measurement => measurement.timeCreated
		)

		return (
			<Modal
				visible={true}
				title={`${node.name} - ${type}`}
				footer={null}
				onCancel={handleClose}
				width="75vw"
				centered
			>
				<Row type="flex" justify="space-around" align="middle">
					<Col span={24}>
						<MeasurementsChart
							measurementsCollection={[
								{
									nodeName: node.name,
									data: graphView.data
								}
							]}
							loading={fetching}
						/>
					</Col>
				</Row>

				<Row type="flex" justify="space-around" align="middle">
					<Col>
						{liveReload ? (
							<DatePicker
								value={moment(fromTimestamp)}
								onChange={date => {
									fetchGraphView({ fromTimestamp: date.valueOf() })
								}}
								placeholder="Start Date"
								showTime
							/>
						) : (
							<RangePicker
								value={[moment(fromTimestamp), moment(toTimestamp)]}
								onChange={date => {
									fetchGraphView({
										fromTimestamp: date[0].valueOf(),
										toTimestamp: date[1].valueOf()
									})
								}}
								showTime
							/>
						)}

						<Switch
							style={{ marginLeft: '10px' }}
							checkedChildren={<Icon type="sync" />}
							unCheckedChildren={<Icon type="disconnect" />}
							checked={liveReload}
							onChange={checked =>
								fetchGraphView({ toTimestamp: checked ? false : Date.now() })
							}
						/>
					</Col>
				</Row>

				<Row type="flex" justify="space-around" align="middle">
					<Col>Presets:{liveReload}</Col>

					<Col>
						<Button
							onClick={() =>
								fetchGraphView({
									fromTimestamp: Date.now() - 1000 * 60 * 60 * 24,
									toTimestamp: false
								})
							}
						>
							Last Day
						</Button>
					</Col>

					<Col>
						<Button
							onClick={() =>
								fetchGraphView({
									fromTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 7,
									toTimestamp: false
								})
							}
						>
							Last Week
						</Button>
					</Col>

					<Col>
						<Button
							onClick={() =>
								fetchGraphView({
									fromTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 30,
									toTimestamp: false
								})
							}
						>
							Last 30 Days
						</Button>
					</Col>
				</Row>
				<Row type="flex" justify="space-around" align="middle">
					<Col>
						<Button
							type="primary"
							onClick={() =>
								downloadAsCsv(
									graphView.data,
									`${node.name}-${type}-${fromTimestamp}-${toTimestamp}.csv`
								)
							}
						>
							Download current view
						</Button>
					</Col>
				</Row>
			</Modal>
		)
	}
}

export default Graphview
