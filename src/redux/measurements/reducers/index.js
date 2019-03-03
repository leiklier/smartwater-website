import refreshMeasurements from './refreshMeasurements'

import fetchMeasurementsGraphview from './fetchMeasurementsGraphview'
import fetchMeasurementsLast from './fetchMeasurementsLast'
import fetchMeasurementsAggregate from './fetchMeasurementsAggregate'

import websocketMeasurements from './websocketMeasurements'

export default function reducer(
	state = {
		measurements: new Object(), // Sparce array with key=nodeId
		fetching: false,
		fetched: false,
		error: null,
		websocket: {
			connected: false
		}
	},
	action
) {
	return (
		refreshMeasurements(state, action) ||
		fetchMeasurementsGraphview(state, action) ||
		fetchMeasurementsLast(state, action) ||
		fetchMeasurementsAggregate(state, action) ||
		websocketMeasurements(state, action) ||
		state
	)
}
