import React, { Component } from 'react'

import { Row, Col, Icon, Typography } from 'antd'
const { Text } = Typography
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import TimeAgo from 'react-timeago'

import { connect } from 'react-redux'

import { fetchMeasurementsLast } from '../../redux/actions'

@connect(
	null,
	(dispatch, ownProps) => {
		const { nodeId, type } = ownProps

		return {
			fetchMeasurementLast: () =>
				dispatch(fetchMeasurementsLast({ nodeId, types: [type] }))
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
		const { nodeId, type, lastMeasurement, measurementSettings } = this.props

		const {
			value,
			fetching,
			fetched,
			error,
			timeCreated,
			lastFetched
		} = this.props.lastMeasurement

		const { format, purpose, tooHigh, tooLow } = measurementSettings

		var valueDisplay, valueElement
		if (fetching) {
			valueDisplay = <Icon type="loading" />
			valueElement = valueDisplay
		} else if (fetched && value !== false) {
			switch (format) {
				case 'PERCENTAGE': {
					valueDisplay = `${value * 100}%`
					break
				}

				case 'DEGREES_CELCIUS': {
					valueDisplay = `${value}°C`
					break
				}

				case 'INTEGER': {
					valueDisplay = Math.round(value)
					break
				}

				case 'FLOAT': {
					valueDisplay = value.toFixed(2) // keep only two decimals
					break
				}

				case 'OPEN_CLOSED': {
					if (value) {
						valueDisplay = 'Closed'
					} else {
						valueDisplay = 'Open'
					}
					break
				}

				default:
					valueDisplay = value
			}

			if (value < tooLow || value > tooHigh) {
				valueElement = (
					<Text>
						<Icon type="close-circle" theme="twoTone" twoToneColor="#f5222d" />
						{valueDisplay}
					</Text>
				)
			} else if (value < tooLow * 1.15 || value > tooHigh * 0.85) {
				valueElement = (
					<Text>
						<Icon
							type="exclamation-circle"
							theme="twoTone"
							twoToneColor="#faad14"
						/>
						{valueDisplay}
					</Text>
				)
			} else {
				valueElement = (
					<Text>
						<Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
						{valueDisplay}
					</Text>
				)
			}
		} else {
			valueDisplay = 'Never received'
			valueElement = (
				<Text type="danger" underline strong>
					<i>{valueDisplay}</i>
				</Text>
			)
		}

		const typeDisplay = type.replace(/_/, ' ').replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		})

		return (
			<Row>
				<Col span={10}>
					<Link
						to={{
							search: queryString.stringify({
								nodeId,
								type,
								modal: 'graphview'
							})
						}}
					>
						<Text>
							<Icon type="arrows-alt" />
							{typeDisplay}
						</Text>
					</Link>
				</Col>
				<Col span={6}>
					<Text>{valueElement}</Text>
				</Col>
				<Col span={6}>
					<Text>
						<TimeAgo date={timeCreated} />
					</Text>
				</Col>
			</Row>
		)
	}
}

export default LastMeasurementRow
