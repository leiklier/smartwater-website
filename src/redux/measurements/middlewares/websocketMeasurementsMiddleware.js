import { apiConfig } from '../../../config/constants'

import {
	WEBSOCKET_MEASUREMENTS_OPEN,
	WEBSOCKET_MEASUREMENTS_CLOSE,
	WEBSOCKET_MEASUREMENTS_TX,
	WEBSOCKET_MEASUREMENTS_RX
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
			const data = JSON.parse(message.data)
			if (data.type && data.type === WEBSOCKET_MEASUREMENTS_RX) dispatch(data)
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
