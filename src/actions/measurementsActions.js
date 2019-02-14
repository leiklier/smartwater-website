import axios from 'axios'

import { apiConfig } from '../config/constants.js'
import {
	MEASUREMENT_TYPES,
	VALID_AGGREGATES,
	MEASUREMENT_INTERVALS
} from '../config/constants'
import {
	PUSH_MEASUREMENT,
	FETCH_MEASUREMENTS_INTERVAL,
	FETCH_MEASUREMENTS_INTERVAL_FULFILLED,
	FETCH_MEASUREMENTS_INTERVAL_REJECTED,
	FETCH_MEASUREMENTS_LAST,
	FETCH_MEASUREMENTS_LAST_FULFILLED,
	FETCH_MEASUREMENTS_LAST_REJECTED,
	FETCH_MEASUREMENTS_AGGREGATE,
	FETCH_MEASUREMENTS_AGGREGATE_FULFILLED,
	FETCH_MEASUREMENTS_AGGREGATE_REJECTED
} from './measurementsActionTypes'

export function pushMeasurement(nodeId, initialState = false) {
	return function(dispatch) {
		dispatch({
			type: PUSH_MEASUREMENT,
			payload: { nodeId: nodeId, initialState: initialState }
		})
	}
}

export function fetchMeasurementsInterval(args) {
	var { nodeId, types, fromTimestamp, toTimestamp } = args
	if (!types) {
		types = MEASUREMENT_TYPES
	}

	return function(dispatch) {
		dispatch({
			type: FETCH_MEASUREMENTS_INTERVAL,
			payload: { nodeId: nodeId, types: types }
		})
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
					payload: { nodeId: nodeId, error: err, types: types }
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
		dispatch({
			type: FETCH_MEASUREMENTS_LAST,
			payload: { nodeId: nodeId, types: types }
		})
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
					payload: { nodeId: nodeId, data: response.data.data }
				})
			})
			.catch(err => {
				dispatch({
					type: FETCH_MEASUREMENTS_LAST_REJECTED,
					payload: { nodeId: nodeId, error: err, types: types }
				})
			})
	}
}

export function fetchMeasurementsAggregate(args) {
	var { nodeId, intervalName, types, aggregate } = args
	const fromTimestamp =
		Date.now() - MEASUREMENT_INTERVALS[intervalName].duration
	if (!types) {
		types = MEASUREMENT_TYPES
	}

	return function(dispatch) {
		dispatch({
			type: FETCH_MEASUREMENTS_AGGREGATE,
			payload: {
				nodeId: nodeId,
				types: types,
				intervalName: intervalName,
				aggregate: aggregate
			}
		})
		var queryUrl =
			apiConfig.host +
			apiConfig.basePath +
			apiConfig.measurementsPath +
			`${nodeId}/` +
			`${fromTimestamp}/` +
			`?aggregate=${aggregate}` +
			`&types=${types.join(',')}`

		axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: FETCH_MEASUREMENTS_AGGREGATE_FULFILLED,
					payload: {
						nodeId: nodeId,
						data: response.data.data,
						intervalName: intervalName,
						aggregate: aggregate,
						types: types,
						fetchedTimestamp: Date.now()
					}
				})
			})
			.catch(err => {
				dispatch({
					type: FETCH_MEASUREMENTS_AGGREGATE_REJECTED,
					payload: {
						nodeId: nodeId,
						error: err,
						intervalName: intervalName,
						aggregate: aggregate,
						types: types
					}
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
