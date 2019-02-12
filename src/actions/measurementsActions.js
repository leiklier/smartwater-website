import axios from 'axios'

import { apiConfig } from '../config/constants.js'

export function fetchMeasurements(args) {
	const { nodeId, types, fromTimestamp, toTimestamp } = args

	return function(dispatch) {
		dispatch({ type: 'FETCH_MEASUREMENTS' })
		var queryUrl =
			apiConfig.host +
			apiConfig.basePath +
			apiConfig.measurementsPath +
			`${nodeId}/` +
			`${fromTimestamp}/`

		if (toTimestamp) {
			queryUrl += `${toTimestamp}/`
		}

		if (types) {
			queryUrl += `?types=${types.split(',')}`
		}

		axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: 'FETCH_MEASUREMENTS_FULFILLED',
					payload: response.data
				})
			})
			.catch(err => {
				dispatch({ type: 'FETCH_MEASUREMENTS_REJECTED', payload: err })
			})
	}
}

export function subscribeMeasurements(types, append = true) {
	return function(dispatch) {
		dispatch({
			type: 'SUBSCRIBE_MEASUREMENTS',
			payload: { types: types, append: append }
		})
	}
}
export function unsubscribeMeasurements(types = false) {
	return function(dispatch) {
		dispatch({ type: 'UNSUBSCRIBE_MEASUREMENTS', payload: { types: types } })
	}
}
