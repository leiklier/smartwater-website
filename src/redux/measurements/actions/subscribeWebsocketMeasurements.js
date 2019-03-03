import { WEBSOCKET_MEASUREMENTS_TX } from '../types'

import { ADD_SUBSCRIPTIONS } from '../websocketActions'

export default function subscribeWebsocketMeasurements(types) {
	// types should be sparse array with key=nodeId
	// and types[nodeId] should be array consisting of all desired types
	return dispatch => {
		dispatch({
			type: WEBSOCKET_MEASUREMENTS_TX,
			payload: {
				action: ADD_SUBSCRIPTIONS,
				types
			}
		})
	}
}
