import React, { Component } from 'react'

import { connect } from 'react-redux'

import QuickviewDatePicker from '../QuickviewDatePicker'
import ToggleModeButton from '../ToggleModeButton'

@connect(store => {
	return {
		mode: store.sites.nodeview.mode
	}
})
class SettingsBar extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { mode } = this.props
		return (
			<span>
				{mode === 'quickview' ? <QuickviewDatePicker /> : ''}
				<ToggleModeButton />
			</span>
		)
	}
}

export default SettingsBar
