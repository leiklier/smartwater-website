import { fetchNodes } from './nodesActions.js'
import {
	pushMeasurement,
	fetchMeasurementsGraphView
} from './measurementsActions.js'

export function initializeStore() {
	return (dispatch, getState) => {
		return dispatch(fetchNodes()).then(() => {
			for (const nodeId in getState().nodes.nodes) {
				dispatch(pushMeasurement(nodeId))
				dispatch(
					fetchMeasurementsGraphView({
						nodeId,
						fromTimestamp: 1500499766327
					})
				)
			}
		})
	}
}
