import { cloneDeep } from 'lodash'

import { CYCLE_SITE_NODEVIEW_MODE } from '../types'

export default function cycleSiteNodeviewMode(state, action) {
	switch (action.type) {
	case CYCLE_SITE_NODEVIEW_MODE: {
		const currentMode = state.nodeview.mode
		let newState = cloneDeep(state)
		const modes = ['quickview', 'aggregatesTable']

		const indexCurrentMode = modes.indexOf(currentMode)
		const indexNextMode =
				indexCurrentMode !== modes.length - 1 && indexCurrentMode !== -1
					? indexCurrentMode + 1
					: 0

		newState.nodeview.mode = modes[indexNextMode]

		return newState
	}

	default:
		return
	}
}
