import { WEBSOCKET_MEASUREMENTS_TX } from '../types'

import { ADD_SUBSCRIPTIONS } from '../websocketActions'

export default function subscribeWebsocketMeasurements(types = false) {
	// types should be sparse array with key=nodeId
	// and types[nodeId] should be array consisting of all desired types
	return (dispatch, getState) => {
		if (!types) {
			types = new Object()
			const { measurements } = getState().measurements
			for (const nodeId in measurements) {
				types[nodeId] = new Array()
				for (const type in measurements[nodeId]) {
					types[nodeId].push(type)
				}
			}
		}

		dispatch({
			type: WEBSOCKET_MEASUREMENTS_TX,
			payload: {
				action: ADD_SUBSCRIPTIONS,
				types
			}
		})
	}
}
