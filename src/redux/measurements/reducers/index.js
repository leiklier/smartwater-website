import refreshMeasurements from './refreshMeasurements'

import setTimestampsMeasurementsQuickView from './setTimestampsMeasurementsQuickView'
import fetchMeasurementsQuickView from './fetchMeasurementsQuickView'
import fetchMeasurementsGraphView from './fetchMeasurementsGraphView'
import fetchMeasurementsLast from './fetchMeasurementsLast'
import fetchMeasurementsAggregate from './fetchMeasurementsAggregate'

import websocketMeasurements from './websocketMeasurements'

export default function reducer(
	state = {
		measurements: new Object(), // Sparce array with key=nodeId
		fetching: false,
		fetched: false,
		error: null,
		quickView: {
			fromTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 7, // Last week
			toTimestamp: false // Realtime is default
		},
		websocket: {
			connected: false,
			types: new Object()
		}
	},
	action
) {
	return (
		refreshMeasurements(state, action) ||
		setTimestampsMeasurementsQuickView(state, action) ||
		fetchMeasurementsQuickView(state, action) ||
		fetchMeasurementsGraphView(state, action) ||
		fetchMeasurementsLast(state, action) ||
		fetchMeasurementsAggregate(state, action) ||
		websocketMeasurements(state, action) ||
		state
	)
}
