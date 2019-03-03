import { cloneDeep } from 'lodash'

import {
	WEBSOCKET_MEASUREMENTS_OPEN,
	WEBSOCKET_MEASUREMENTS_CLOSE,
	WEBSOCKET_MEASUREMENTS_RX
} from '../types'

export default function websocketMeasurements(state, action) {
	switch (action.type) {
	case WEBSOCKET_MEASUREMENTS_OPEN: {
		let newState = cloneDeep(state)
		newState.websocket.connected = true
		return newState
	}

	case WEBSOCKET_MEASUREMENTS_CLOSE: {
		let newState = cloneDeep(state)
		newState.websocket.connected = false
		return newState
	}

	default:
		return
	}
}
