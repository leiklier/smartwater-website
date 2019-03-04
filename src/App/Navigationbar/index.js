import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Layout, Menu, Icon } from 'antd'
const { Header } = Layout

import LogoSvg from '../../static/logo/logo.svg'

@connect(store => {
	// Gets routed to this.props
	return {
		pageVisiting: `/${store.router.location.pathname.split('/')[1]}`
	}
})
class Navigationbar extends Component {
	render() {
		console.log(this.props.pageVisiting)
		const { pageVisiting } = this.props
		return (
			<Header style={{ zIndex: 1, width: '100%', padding: '0' }}>
				<Menu
					mode="horizontal"
					style={{ lineHeight: '64px', width: '100%' }}
					selectedKeys={[pageVisiting]}
				>
					<Menu.Item key="/">
						<Link to="/">
							<Icon
								style={{ verticalAlign: 'middle' }}
								component={() => (
									<LogoSvg
										style={{
											height: '40px',
											width: 'auto',
											margin: 'none'
										}}
									/>
								)}
							/>
							SmartWater
						</Link>
					</Menu.Item>
					<Menu.Item key="/dashboard">
						<Link to="/dashboard">Dashboard</Link>
					</Menu.Item>
					<Menu.Item key="/about">
						<Link to="/about">About</Link>
					</Menu.Item>
				</Menu>
			</Header>
		)
	}
}

export default Navigationbar
