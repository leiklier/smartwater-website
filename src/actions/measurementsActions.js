import axios from 'axios'

import { apiConfig } from '../config/constants.js'
import { MEASUREMENT_TYPES } from '../config/constants'
import {
	FETCH_MEASUREMENTS_INTERVAL,
	FETCH_MEASUREMENTS_INTERVAL_FULFILLED,
	FETCH_MEASUREMENTS_INTERVAL_REJECTED,
	FETCH_MEASUREMENTS_LAST,
	FETCH_MEASUREMENTS_LAST_FULFILLED,
	FETCH_MEASUREMENTS_LAST_REJECTED
} from './measurementsActionTypes'

export function fetchMeasurementsInterval(args) {
	var { nodeId, types, fromTimestamp, toTimestamp } = args
	if (!types) {
		types = MEASUREMENT_TYPES
	}

	return function(dispatch) {
		dispatch({ type: FETCH_MEASUREMENTS_INTERVAL, payload: { types: types } })
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
			queryUrl += `?types=${types.join(',')}`
		}

		axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: FETCH_MEASUREMENTS_INTERVAL_FULFILLED,
					payload: {
						nodeId: response.data.nodeId,
						data: response.data.data,
						fromTimestamp: fromTimestamp,
						toTimestamp: toTimestamp
					}
				})
			})
			.catch(err => {
				dispatch({
					type: FETCH_MEASUREMENTS_INTERVAL_REJECTED,
					payload: { error: err, types: types }
				})
			})
	}
}

export function fetchMeasurementsLast(args) {
	var { nodeId, types } = args
	if (!types) {
		types = MEASUREMENT_TYPES
	}
	return function(dispatch) {
		dispatch({ type: FETCH_MEASUREMENTS_LAST, payload: { types: types } })
		var queryUrl =
			apiConfig.host +
			apiConfig.basePath +
			apiConfig.measurementsPath +
			`${nodeId}/`

		if (types) {
			queryUrl += `?types=${types.join(',')}`
		}
		axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: FETCH_MEASUREMENTS_LAST_FULFILLED,
					payload: response.data
				})
			})
			.catch(err => {
				dispatch({
					type: FETCH_MEASUREMENTS_LAST_REJECTED,
					payload: { error: err, types: types }
				})
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
