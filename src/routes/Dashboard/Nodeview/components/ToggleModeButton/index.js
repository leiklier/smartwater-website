import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'

import { modeToIconType } from './controllers'
import { cycleSiteNodeviewMode } from '../../../../../redux/actions'

@connect(
	store => {
		return {
			mode: store.sites.nodeview.mode
		}
	},
	(dispatch, ownProps) => {
		return {
			cycleMode: () => dispatch(cycleSiteNodeviewMode())
		}
	}
)
class ToggleModeButton extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { mode, cycleMode } = this.props

		var buttonIconType = modeToIconType(mode)

		return (
			<Button onClick={() => cycleMode()}>
				<Icon type={buttonIconType} />
			</Button>
		)
	}
}

export default ToggleModeButton
