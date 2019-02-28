import axios from 'axios'

import { apiConfig } from '../../../config/constants'

import {
	FETCH_MEASUREMENTS_LAST,
	FETCH_MEASUREMENTS_LAST_FULFILLED,
	FETCH_MEASUREMENTS_LAST_REJECTED
} from '../types'

export default function fetchMeasurementsLast(args) {
	return (dispatch, getState) => {
		const { measurements } = getState().measurements
		var { nodeId, initialize, types } = args

		if (!measurements[nodeId]) return

		types = types || Object.keys(measurements[nodeId])
		var typesToFetch = new Array()

		for (const type of types) {
			if (!Object.keys(measurements[nodeId]).includes(type)) {
				continue
			}
			if (initialize) {
				const { fetching, fetched } = measurements[nodeId][
					type
				].lastMeasurement
				if ((fetched || fetching) && types.indexOf(type > -1)) continue
			}
			typesToFetch.push(type)
		}

		if (typesToFetch.length === 0) return

		dispatch({
			type: FETCH_MEASUREMENTS_LAST,
			payload: { nodeId, types: typesToFetch }
		})

		var queryUrl =
			apiConfig.host +
			apiConfig.basePath +
			apiConfig.measurementsPath +
			`${nodeId}/` +
			`?types=${typesToFetch.join(',')}`

		return axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: FETCH_MEASUREMENTS_LAST_FULFILLED,
					payload: { nodeId, types: typesToFetch, data: response.data.data }
				})
			})
			.catch(error => {
				dispatch({
					type: FETCH_MEASUREMENTS_LAST_REJECTED,
					payload: { nodeId, types: typesToFetch, error }
				})
			})
	}
}
