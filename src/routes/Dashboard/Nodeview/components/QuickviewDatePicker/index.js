import React, { Component } from 'react'
import { DatePicker, Switch, Icon, Row, Col } from 'antd'
const { RangePicker } = DatePicker

import { connect } from 'react-redux'
import moment from 'moment'

import { setTimestampsMeasurementsQuickView } from '../../../../../redux/actions'

@connect(
	store => {
		return {
			fromTimestamp: store.measurements.quickView.fromTimestamp,
			toTimestamp: store.measurements.quickView.toTimestamp
		}
	},
	(dispatch, ownProps) => {
		return {
			setTimestamps: (fromTimestamp, toTimestamp) => {
				dispatch(setTimestampsMeasurementsQuickView(fromTimestamp, toTimestamp))
			}
		}
	}
)
class QuickviewDatePicker extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { fromTimestamp, toTimestamp, setTimestamps } = this.props
		const liveReload = !toTimestamp

		return (
			<span>
				{liveReload ? (
					<DatePicker
						value={moment(fromTimestamp)}
						onChange={date => {
							const fromTimestamp = date.valueOf()
							setTimestamps(fromTimestamp, toTimestamp)
						}}
						placeholder="Start Date"
						showTime
					/>
				) : (
					<RangePicker
						value={[moment(fromTimestamp), moment(toTimestamp)]}
						onChange={date => {
							const fromTimestamp = date[0].valueOf()
							const toTimestamp = date[1].valueOf()
							setTimestamps(fromTimestamp, toTimestamp)
						}}
						showTime
					/>
				)}
				<Switch
					style={{ marginLeft: '10px' }}
					checkedChildren={<Icon type="sync" />}
					unCheckedChildren={<Icon type="disconnect" />}
					checked={liveReload}
					onChange={checked => {
						const toTimestamp = checked ? false : Date.now()
						setTimestamps(fromTimestamp, toTimestamp)
					}}
				/>
			</span>
		)
	}
}

export default QuickviewDatePicker
