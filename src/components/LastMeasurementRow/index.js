import React, { Component } from 'react'

import { Row, Col, Icon, Typography, Button } from 'antd'
const { Text } = Typography
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import TimeAgo from 'react-timeago'

import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { fetchMeasurementsLast } from '../../redux/actions'

import { valueToIcon, formatValue, wrapTypeWithLink } from './controllers'
import { formatType } from '../../controllers'

@connect(
	store => {
		return {
			site: queryString.parse(store.router.search).site
		}
	},
	(dispatch, ownProps) => {
		const { nodeId, type } = ownProps

		return {
			fetchMeasurementLast: () =>
				dispatch(fetchMeasurementsLast({ nodeId, types: [type] })),
			openGraphview: site => {
				dispatch(
					push({
						search: queryString.stringify({
							nodeId,
							type,
							site,
							modal: 'graphview'
						})
					})
				)
			}
		}
	}
)
class LastMeasurementRow extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		const { fetching, fetched } = this.props.lastMeasurement
		if (!fetching && !fetched) this.props.fetchMeasurementLast()
	}

	render() {
		const {
			site,
			nodeId,
			type,
			lastMeasurement,
			measurementSettings,
			openGraphview
		} = this.props

		const {
			value,
			fetching,
			fetched,
			error,
			timeCreated,
			lastFetched
		} = this.props.lastMeasurement

		const { format, purpose, tooHigh, tooLow } = measurementSettings

		const statusIcon = valueToIcon(value, fetching, tooLow, tooHigh)
		const formattedType = formatType(type)

		var formattedValue = 'Not received'
		if (fetched && value !== false) formattedValue = formatValue(value, format)

		return (
			<Row type="flex" justify="space-around" align="middle">
				<Col span={12}>
					<Row>
						<Col span={24}>
							<Text>{formattedType}</Text>
						</Col>
					</Row>
					<Row type="flex" justify="left">
						<Col span={6}>{statusIcon}</Col>
						<Col span={18}>
							<Row>
								<Col span={24}>
									<Text strong>{formattedValue}</Text>
								</Col>
							</Row>
							<Row>
								<Col span={24}>
									<Text>
										<TimeAgo date={timeCreated} />
									</Text>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col span={4}>
					<Button onClick={() => openGraphview(site)}>
						<Icon type="arrows-alt" style={{ fontSize: '24px' }} />
					</Button>
				</Col>
			</Row>
		)
	}
}

export default LastMeasurementRow
