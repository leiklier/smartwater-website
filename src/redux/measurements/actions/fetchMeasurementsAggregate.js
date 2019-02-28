import axios from 'axios'

import { apiConfig, MEASUREMENT_INTERVALS } from '../../../config/constants'

import {
	FETCH_MEASUREMENTS_AGGREGATE,
	FETCH_MEASUREMENTS_AGGREGATE_FULFILLED,
	FETCH_MEASUREMENTS_AGGREGATE_REJECTED
} from '../types'

export default function fetchMeasurementsAggregate(
	nodeId,
	aggregate,
	intervalName,
	types = false
) {
	return (dispatch, getState) => {
		const { measurements } = getState().measurements

		if (!measurements[nodeId]) return
		if (!Object.keys(MEASUREMENT_INTERVALS).includes(intervalName)) return

		types = types || Object.keys(measurements[nodeId])
		var typesToFetch = new Array()

		for (const type of types) {
			if (!Object.keys(measurements[nodeId]).includes(type)) continue
			typesToFetch.push(type)
		}

		dispatch({
			type: FETCH_MEASUREMENTS_AGGREGATE,
			payload: {
				nodeId,
				types: typesToFetch,
				intervalName,
				aggregate
			}
		})

		const fromTimestamp =
			Date.now() - MEASUREMENT_INTERVALS[intervalName].duration

		var queryUrl =
			apiConfig.host +
			apiConfig.basePath +
			apiConfig.measurementsPath +
			`${nodeId}/` +
			`${fromTimestamp}/` +
			`?aggregate=${aggregate}` +
			`&types=${typesToFetch.join(',')}`

		return axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: FETCH_MEASUREMENTS_AGGREGATE_FULFILLED,
					payload: {
						nodeId,
						types: typesToFetch,
						data: response.data.data,
						intervalName,
						aggregate,
						fetchedTimestamp: Date.now()
					}
				})
			})
			.catch(error => {
				dispatch({
					type: FETCH_MEASUREMENTS_AGGREGATE_REJECTED,
					payload: {
						nodeId,
						error,
						intervalName,
						aggregate,
						types: typesToFetch
					}
				})
			})
	}
}
