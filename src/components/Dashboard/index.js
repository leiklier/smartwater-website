import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Card, Row, Col, Tabs, Table } from 'antd'
const TabPane = Tabs.TabPane

const dataSource = [
	{
		key: '1',
		name: 'Last hour',
		average: '40',
		high: '60',
		low: '20'
	},
	{
		key: '2',
		name: 'Last Day',
		average: '40',
		high: '60',
		low: '20'
	},
	{
		key: '3',
		name: 'Last month',
		average: '40',
		high: '60',
		low: '20'
	}
]
const columns = [
	{
		title: '',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: 'Average',
		dataIndex: 'average',
		key: 'average'
	},
	{
		title: 'High',
		dataIndex: 'high',
		key: 'high'
	},
	{
		title: 'Low',
		dataIndex: 'low',
		key: 'low'
	}
]

class Dashboard extends Component {
	render() {
		return (
			<div>
				<Tabs defaultActiveKey="1" tabPosition="left">
					<TabPane tab="Ranheim Fabrikker #1" key="1" pagination={false}>
						<Row>
							<Col span={12}>
								<Card title="Batterinivå" type="inner">
									<Row>
										<Col span={12}>Latest measurement:</Col>
										<Col span={12}>32%</Col>
									</Row>
									<Row>
										<Col span={24}>
											<Table dataSource={dataSource} columns={columns} />
										</Col>
									</Row>
								</Card>
							</Col>
							<Col span={12}>
								<Card title="Batterinivå" type="inner">
									Sensoravlesninger
								</Card>
							</Col>
						</Row>
						<Row>
							<Col span={8}>Content</Col>
							<Col span={8}>Content</Col>
							<Col span={8}>Content</Col>
						</Row>
					</TabPane>
					<TabPane tab="Ranheim Fabrikker #2" key="2" />
				</Tabs>
			</div>
		)
	}
}

export default Dashboard
