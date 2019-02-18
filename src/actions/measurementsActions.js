import axios from 'axios'

import { apiConfig } from '../config/constants.js'
import {
	MEASUREMENT_TYPES,
	VALID_AGGREGATES,
	MEASUREMENT_INTERVALS
} from '../config/constants'
import {
	REFRESH_MEASUREMENTS,
	FETCH_MEASUREMENTS_GRAPHVIEW,
	FETCH_MEASUREMENTS_GRAPHVIEW_FULFILLED,
	FETCH_MEASUREMENTS_GRAPHVIEW_REJECTED,
	FETCH_MEASUREMENTS_LAST,
	FETCH_MEASUREMENTS_LAST_FULFILLED,
	FETCH_MEASUREMENTS_LAST_REJECTED,
	FETCH_MEASUREMENTS_AGGREGATE,
	FETCH_MEASUREMENTS_AGGREGATE_FULFILLED,
	FETCH_MEASUREMENTS_AGGREGATE_REJECTED
} from './measurementsActionTypes'

export function refreshMeasurements() {
	return (dispatch, getState) => {
		var types = new Object()
		if (getState().nodes.fetched) {
			for (const nodeId in getState().nodes.nodes) {
				if (!getState().nodes.nodes[nodeId].settings.measurements) continue

				types[nodeId] = new Array()
				for (const type in getState().nodes.nodes[nodeId].settings
					.measurements) {
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

export function fetchMeasurementsGraphView(args) {
	return (dispatch, getState) => {
		var { nodeId, types, fromTimestamp, toTimestamp } = args
		types = types || Object.keys(getState().measurements[nodeId])
		dispatch({
			type: FETCH_MEASUREMENTS_GRAPHVIEW,
			payload: { nodeId, types }
		})
		var queryUrl =
			apiConfig.host +
			apiConfig.basePath +
			apiConfig.measurementsPath +
			`${nodeId}/` +
			`${fromTimestamp}/`

		queryUrl += toTimestamp ? `${toTimestamp}/` : ''
		queryUrl += `?types=${types.join(',')}`

		return axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: FETCH_MEASUREMENTS_GRAPHVIEW_FULFILLED,
					payload: {
						nodeId,
						types,
						data: response.data.data,
						fromTimestamp,
						toTimestamp
					}
				})
			})
			.catch(error => {
				dispatch({
					type: FETCH_MEASUREMENTS_GRAPHVIEW_REJECTED,
					payload: { nodeId, error, types }
				})
			})
	}
}

export function fetchMeasurementsLast(nodeId, types = false) {
	return (dispatch, getState) => {
		types = types || Object.keys(getState().measurements[nodeId])
		dispatch({
			type: FETCH_MEASUREMENTS_LAST,
			payload: { nodeId, types }
		})
		var queryUrl =
			apiConfig.host +
			apiConfig.basePath +
			apiConfig.measurementsPath +
			`${nodeId}/` +
			`?types=${types.join(',')}`

		return axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: FETCH_MEASUREMENTS_LAST_FULFILLED,
					payload: { nodeId, types, data: response.data.data }
				})
			})
			.catch(error => {
				dispatch({
					type: FETCH_MEASUREMENTS_LAST_REJECTED,
					payload: { nodeId, types, error }
				})
			})
	}
}

export function fetchMeasurementsAggregate(args) {
	var { nodeId, intervalName, types, aggregate } = args
	const fromTimestamp =
		Date.now() - MEASUREMENT_INTERVALS[intervalName].duration
	if (!types) types = MEASUREMENT_TYPES

	return dispatch => {
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

		return axios
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
