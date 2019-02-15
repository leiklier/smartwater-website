import React, { Component } from 'react'

import { Menu } from 'antd'
const { SubMenu } = Menu

class Aside extends Component {
	render() {
		var nodesObject = this.props.nodes
		var nodes = { data: {} },
			fetching = false,
			fetched = false,
			error = null
		for (let nodeId in nodesObject) {
			if (nodeId === 'meta') {
				const { fetching, fetched, error } = nodesObject[nodeId]
				nodes['meta'] = {
					fetching,
					fetched,
					error
				}
			} else {
				nodes['data'][nodeId] = { ...nodesObject[nodeId] }
			}
		}
		return (
			<Menu style={{ width: 256 }} theme="dark" mode="inline">
				<Menu.Item key="overView">Overview</Menu.Item>
				<SubMenu key="nodeView" title="NodeView">
					{Object.keys(nodes.data).map(nodeId => {
						return <Menu.Item key={nodeId}>{nodes.data[nodeId].name}</Menu.Item>
					})}
				</SubMenu>
			</Menu>
		)
	}
}

export default Aside
