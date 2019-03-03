import { apiConfig } from '../../../config/constants'

import {
	WEBSOCKET_MEASUREMENTS_OPEN,
	WEBSOCKET_MEASUREMENTS_CLOSE,
	WEBSOCKET_MEASUREMENTS_TX
} from '../types'

export default function websocketMeasurementsMiddleware() {
	const { hostWs, basePath, measurementsPath } = apiConfig

	const ws = new WebSocket(`${hostWs}${basePath}${measurementsPath}`)

	return ({ dispatch }) => next => action => {
		ws.onopen = () => {
			dispatch({ type: WEBSOCKET_MEASUREMENTS_OPEN })
		}

		ws.onclose = () => {
			dispatch({ type: WEBSOCKET_MEASUREMENTS_CLOSE })
		}

		ws.onmessage = message => {
			dispatch(JSON.parse(message.data))
		}

		switch (action.type) {
		case WEBSOCKET_MEASUREMENTS_TX: {
			ws.send(JSON.stringify(action))
			break
		}

		default: {
			return next(action)
		}
		}
	}
}
