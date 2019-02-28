import React, { Component } from 'react'

import { goBack } from 'connected-react-router'
import { connect } from 'react-redux'

import { Layout, Icon, Button } from 'antd'
const { Header, Content } = Layout

import MeasurementCard from '../../../components/MeasurementCard'
@connect(
	null,
	dispatch => {
		return {
			handleGoBack: () => {
				dispatch(
					goBack({
						pathname: '/dashboard',
						search: ''
					})
				)
			}
		}
	}
)
class Nodeview extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { nodeId, nodeData, measurements, handleGoBack } = this.props
		return (
			<Layout>
				<Header>
					<Button
						onClick={handleGoBack}
						style={{ marginRight: '15px' }}
						type="secondary"
						ghost
					>
						<Icon
							type="left"
							style={{ marginLeft: '15px', marginRight: '10px' }}
						/>
						Back to Overview
					</Button>
					<h2 style={{ color: 'white', display: 'inline-block' }}>
						{nodeData.name}
					</h2>
				</Header>
				<Content>
					{Object.keys(measurements).map(type => {
						return (
							<MeasurementCard
								key={nodeId + type}
								nodeId={nodeId}
								type={type}
								measurement={measurements[type]}
							/>
						)
					})}
				</Content>
			</Layout>
		)
	}
}

export default Nodeview
