import { fetchNodes } from './nodesActions.js'
import {
	refreshMeasurements,
	fetchMeasurementsGraphView,
	fetchMeasurementsLast,
	fetchMeasurementsAggregate
} from './measurementsActions.js'

export function initializeStore() {
	return (dispatch, getState) => {
		dispatch(fetchNodes())
			.then(() => {
				dispatch(
					fetchMeasurementsGraphView({
						nodeId: 1,
						fromTimestamp: 1500511031199
					})
				).then(() => {
					dispatch(fetchMeasurementsLast(1))
				})
			})
			.then(() => {
				dispatch(fetchMeasurementsAggregate(1, 'AVERAGE', 'lastDay'))
			})
	}
}
