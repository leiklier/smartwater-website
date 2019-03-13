import React, { Component } from 'react'

import { goBack } from 'connected-react-router'
import { connect } from 'react-redux'

import { Layout, PageHeader, Icon, Button } from 'antd'
const { Header, Content } = Layout

import SettingsBar from './components/SettingsBar'

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
		const { nodeId, node, measurements, handleGoBack } = this.props
		return (
			<Layout>
				<PageHeader
					title="Nodeview"
					subTitle={node.name}
					onBack={() => {
						handleGoBack()
					}}
					extra={[<SettingsBar key={1} />]}
				/>
				<Content>
					{Object.keys(measurements).map(type => {
						return (
							<MeasurementCard
								key={nodeId + type}
								nodeId={nodeId}
								node={node}
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
