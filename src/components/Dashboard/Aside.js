import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd'
const { SubMenu } = Menu

import { connect } from 'react-redux'

@connect(store => {
	return {
		pageVisiting: `/${store.router.location.pathname.split('/')[1]}`,
		viewVisiting: store.router.location.pathname.split('/')[2]
			? store.router.location.pathname.split('/')[3]
				? `/${store.router.location.pathname.split('/')[2]}/${
						store.router.location.pathname.split('/')[3]
				  }`
				: `/${store.router.location.pathname.split('/')[2]}`
			: '/overview'
	}
})
class Aside extends Component {
	render() {
		const {
			viewVisiting,
			pageVisiting,
			nodes,
			fetching,
			fetched,
			error
		} = this.props
		return (
			<Menu
				style={{ height: '100%' }}
				theme="dark"
				mode="inline"
				selectedKeys={[`${pageVisiting}${viewVisiting}`]}
			>
				<Menu.Item key={`${pageVisiting}/overview`}>
					<Link to={pageVisiting}>Overview</Link>
				</Menu.Item>
				<SubMenu key={`${pageVisiting}/nodeview`} title="NodeView">
					{fetched
						? Object.keys(nodes).map(nodeId => {
								return (
									<Menu.Item key={`${pageVisiting}/nodeview/${nodeId}`}>
										<Link to={`${pageVisiting}/nodeview/${nodeId}`}>
											{nodes[nodeId].name}
										</Link>
									</Menu.Item>
								)
						  })
						: false}
				</SubMenu>
			</Menu>
		)
	}
}

export default Aside
