import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Layout, Menu } from 'antd'
const { Header } = Layout

@connect(store => {
	// Gets routed to this.props
	return {
		pageVisiting: store.router.location.pathname
	}
})
class Navigationbar extends Component {
	render() {
		const { pageVisiting } = this.props
		return (
				<Header style={{ zIndex: 1, width: '100%', padding: '0' }}>
					<Menu
						mode="horizontal"
						style={{ lineHeight: '64px', width: '100%' }}
						selectedKeys={[pageVisiting]}
					>
						<Menu.Item key="/">
							<Link to="/">Home</Link>
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
