import React, { Component } from 'react'

import { Button, Icon } from 'antd'

class NodeSettingsButton extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Button>
				<Icon type="setting" />
			</Button>
		)
	}
}

export default NodeSettingsButton
