import React, { Component } from 'react'

import { goBack } from 'connected-react-router'
import { connect } from 'react-redux'

import { Layout, PageHeader, Icon, Button } from 'antd'
const { Header, Content } = Layout

import QuickviewDatePicker from './components/QuickviewDatePicker'
import ToggleModeButton from './components/ToggleModeButton'
import NodeSettingsButton from './components/NodeSettingsButton'

import MeasurementCard from '../../../components/MeasurementCard'
@connect(
	store => {
		return {
			mode: store.sites.nodeview.mode
		}
	},
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
		const { nodeId, node, measurements, handleGoBack, mode } = this.props
		return (
			<Layout>
				<PageHeader
					title="Nodeview"
					subTitle={node.name}
					onBack={() => {
						handleGoBack()
					}}
					extra={[
						mode === 'quickview' ? <QuickviewDatePicker /> : '',
						<ToggleModeButton />,
						<NodeSettingsButton />
					]}
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
