import { fetchMeasurementsQuickView } from '.'

export default function fetchAllMeasurementsQuickView() {
	return (dispatch, getState) => {
		const { measurements } = getState().measurements
		const nodeIds = Object.keys(measurements)
		for (const nodeId of nodeIds) {
			dispatch(fetchMeasurementsQuickView(nodeId))
		}
	}
}
