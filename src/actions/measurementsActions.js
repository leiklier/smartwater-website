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
		if (!getState().measurements[nodeId]) return
		types = types || Object.keys(getState().measurements[nodeId])
		for (const type of types[nodeId]) {
			if (!Object.keys(getState().measurements[nodeId]).includes(type))
				delete types[nodeId][type]
		}

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

export function fetchMeasurementsAggregate(
	nodeId,
	aggregate,
	intervalName,
	types = false
) {
	return (dispatch, getState) => {
		if (!getState().measurements[nodeId]) return
		if (!Object.keys(MEASUREMENT_INTERVALS).includes(intervalName)) return
		types = types || Object.keys(getState().measurements[nodeId])
		for (const type of types[nodeId]) {
			if (!Object.keys(getState().measurements[nodeId]).includes(type))
				delete types[nodeId][type]
		}

		dispatch({
			type: FETCH_MEASUREMENTS_AGGREGATE,
			payload: {
				nodeId,
				types,
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
			`&types=${types.join(',')}`

		return axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: FETCH_MEASUREMENTS_AGGREGATE_FULFILLED,
					payload: {
						nodeId,
						types,
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
						types
					}
				})
			})
	}
}
