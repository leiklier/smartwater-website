import { REFRESH_MEASUREMENTS } from '../types'

export default function refreshMeasurements() {
	return (dispatch, getState) => {
		const { nodes, fetched } = getState().nodes

		var types = new Object()

		if (fetched) {
			for (const nodeId in nodes) {
				if (!nodes[nodeId].settings.measurements) continue

				types[nodeId] = new Array()
				for (const type in nodes[nodeId].settings.measurements) {
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
