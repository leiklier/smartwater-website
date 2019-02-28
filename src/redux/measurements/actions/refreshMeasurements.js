import { REFRESH_MEASUREMENTS } from '../types'

export default function refreshMeasurements() {
	return (dispatch, getState) => {
		var types = new Object()
		if (getState().nodes.fetched) {
			for (const nodeId in getState().nodes.nodes) {
				if (!getState().nodes.nodes[nodeId].settings.measurements) continue

				types[nodeId] = new Array()
				for (const type in getState().nodes.nodes[nodeId].settings
					.measurements) {
					types[nodeId].push(type)
				}
			}
		}
		return dispatch({
			type: REFRESH_MEASUREMENTS,
			payload: { types }
		})
	}
}
