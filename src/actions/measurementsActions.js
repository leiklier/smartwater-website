import axios from 'axios'

import { apiConfig } from '../config/constants.js'
import { MEASUREMENT_TYPES } from '../config/constants'
import {
	FETCH_MEASUREMENTS_INTERVAL,
	FETCH_MEASUREMENTS_INTERVAL_FULFILLED,
	FETCH_MEASUREMENTS_INTERVAL_REJECTED
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
			queryUrl += `?types=${types.split(',')}`
		}

		axios
			.get(queryUrl)
			.then(response => {
				var data = new Object()
				for (const type in response.data.data) {
					data[type] = new Object()
					for (const measurement of response.data.data[type]) {
						data[type][measurement.timeCreated] = {
							value: measurement.value,
							position: measurement.position
						}
					}
				}
				dispatch({
					type: FETCH_MEASUREMENTS_INTERVAL_FULFILLED,
					payload: {
						nodeId: response.data.nodeId,
						data: data
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
