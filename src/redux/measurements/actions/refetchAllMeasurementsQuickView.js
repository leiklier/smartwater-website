import { fetchMeasurementsQuickView } from '.'

export default function refetchAllMeasurementsQuickView() {
	return (dispatch, getState) => {
		const { measurements } = getState().measurements
		for (const nodeId in measurements) {
			let typesToFetch = new Array()

			for (const type in measurements[nodeId]) {
				const { fetching, fetched } = measurements[nodeId][type].quickView
				if (fetched && !fetching) {
					typesToFetch.push(type)
				}
			}

			if (typesToFetch.length)
				dispatch(fetchMeasurementsQuickView(nodeId, typesToFetch))
		}
	}
}
