import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table, Icon } from 'antd'

import { startCase } from 'lodash'

import { fetchMeasurementsAggregate } from '../../redux/actions'

import { formatValue } from '../../controllers'

@connect(
	null,
	(dispatch, ownProps) => {
		const { nodeId, type, aggregates } = ownProps
		return {
			fetchAggregates: () => {
				for (const intervalName in aggregates) {
					for (const aggregate in aggregates[intervalName]) {
						if (aggregate !== 'duration') {
							dispatch(
								fetchMeasurementsAggregate(nodeId, aggregate, intervalName, [
									type
								])
							)
						}
					}
				}
			}
		}
	}
)
class AggregatesMeasurementTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			intervalId: null
		}
	}

	componentDidMount() {
		this.props.fetchAggregates()
		const intervalId = setInterval(this.props.fetchAggregates, 1000 * 60 * 5)
		this.setState({ intervalId })
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId)
	}

	render() {
		const { aggregates, measurementSettings } = this.props
		const { format } = measurementSettings

		const tableData = new Array()
		for (const intervalName in aggregates) {
			const rowData = {
				intervalName: startCase(intervalName)
			}
			for (const aggregate in aggregates[intervalName]) {
				if (aggregate !== 'duration') {
					if (
						aggregates[intervalName][aggregate].fetching &&
						!aggregates[intervalName][aggregate].fetched
					) {
						rowData[aggregate] = <Icon type="loading" />
						continue
					} else if (aggregates[intervalName][aggregate].value === false) {
						rowData[aggregate] = (
							<Icon
								type="close-circle"
								style={{ color: 'rgba(0,0,0, 0.25)' }}
							/>
						)
						continue
					}
					rowData[aggregate] = formatValue(
						aggregates[intervalName][aggregate].value,
						format
					)
				}
			}
			tableData.push(rowData)
		}
		const tableColumns = [
			{
				title: '',
				dataIndex: 'intervalName',
				key: 'intervalName'
			},
			{
				title: 'Lowest',
				dataIndex: 'LOWEST',
				key: 'LOWEST'
			},
			{
				title: 'Highest',
				dataIndex: 'HIGHEST',
				key: 'HIGHEST'
			},
			{
				title: 'Average',
				dataIndex: 'AVERAGE',
				key: 'AVERAGE'
			}
		]
		return (
			<Table dataSource={tableData} columns={tableColumns} pagination={false} />
		)
	}
}
export default AggregatesMeasurementTable
