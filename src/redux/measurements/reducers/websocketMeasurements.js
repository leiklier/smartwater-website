import { cloneDeep } from 'lodash'

import {
	WEBSOCKET_MEASUREMENTS_OPEN,
	WEBSOCKET_MEASUREMENTS_CLOSE,
	WEBSOCKET_MEASUREMENTS_RX
} from '../types'

import {
	INCOMING_DATA,
	ADD_SUBSCRIPTIONS_FULFILLED,
	REMOVE_SUBSCRIPTIONS_FULFILLED
} from '../websocketActions'

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

	case WEBSOCKET_MEASUREMENTS_RX: {
		let newState = cloneDeep(state)

		switch (action.payload.action) {
		case ADD_SUBSCRIPTIONS_FULFILLED: {
			newState.websocket.types = action.payload.types
			break
		}

		case REMOVE_SUBSCRIPTIONS_FULFILLED: {
			newState.websocket.types = action.payload.types
			break
		}

		case INCOMING_DATA: {
			const {
				nodeId,
				type,
				value,
				position,
				timeCreated
			} = action.payload.data
			const measurement = newState.measurements[nodeId][type]
			let { lastMeasurement, quickView, graphView } = measurement
			let quickViewSettings = newState.quickView

			lastMeasurement = {
				...lastMeasurement,
				value,
				timeCreated,
				lastFetched: Date.now()
			}

			if (!quickViewSettings.toTimestamp)
			// quickView should be live updated
				quickView.data.unshift({ position, timeCreated, value })

			if (!graphView.toTimestamp)
			// graphView should be live updated
				graphView.data.unshift({ position, timeCreated, value })

			newState.measurements[nodeId][type] = {
				...measurement,
				lastMeasurement,
				quickView,
				graphView
			}
			break
		}

		default:
			break
		}

		return newState
	}

	default:
		return
	}
}
