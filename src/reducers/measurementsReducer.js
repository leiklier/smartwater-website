import { cloneDeep } from 'lodash'

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
} from '../actions/measurementsActionTypes'

import { MEASUREMENT_INTERVALS } from '../config/constants'

import { MEASUREMENT_TYPES, VALID_AGGREGATES } from '../config/constants'

export function newMeasurementElement(types = false) {
	return {
		...(() => {
			types = types || MEASUREMENT_TYPES
			var measurements = new Object()
			for (const type of types) {
				measurements[type] = new Object()

				// Aggregates
				measurements[type].aggregates = (() => {
					var aggregates = new Object()

					for (const interval in MEASUREMENT_INTERVALS) {
						aggregates[interval] = {
							duration: MEASUREMENT_INTERVALS[interval].duration,
							textDisplay: MEASUREMENT_INTERVALS[interval].textDisplay
						}
						for (const valid_aggregate of VALID_AGGREGATES) {
							aggregates[interval][valid_aggregate] = {
								value: false, // number
								lastUpdated: null, // timestamp
								fetching: false, // boolean
								fetched: false, // boolean
								error: null // error object
							}
						}
					}
					return aggregates
				})()

				measurements[type].graphView = {
					data: new Array(),
					fromTimestamp: Date.now() - 60 * 60 * 24,
					toTimestamp: false,
					fetching: false,
					fetched: false,
					error: null
				}

				measurements[type].lastMeasurement = {
					value: false,
					timeCreated: false,
					position: {
						lng: false,
						lat: false
					},
					fetching: false,
					fetched: false,
					lastFetched: false,
					error: null
				}
			}
			return measurements
		})()
	}
}

export default function reducer(
	state = new Object(), // Should be sparse array with key=nodeId
	action
) {
	var newState = cloneDeep(state)

	switch (action.type) {
	case REFRESH_MEASUREMENTS: {
		const { types } = action.payload
		for (const nodeId in types) {
			if (!newState[nodeId]) {
				newState[nodeId] = newMeasurementElement(types[nodeId])
				continue
			}
			for (const type of types[nodeId]) {
				if (!newState[nodeId][types]) {
					// TODO: Add new type here
				}
			}
		}
		break
	}
	case FETCH_MEASUREMENTS_GRAPHVIEW: {
		const { nodeId, types } = action.payload
		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue

			newState[nodeId][type].graphView = {
				...newState[nodeId][type].graphView,
				fetching: true,
				fetched: false,
				error: null
			}
		}
		break
	}
	case FETCH_MEASUREMENTS_GRAPHVIEW_FULFILLED: {
		const { nodeId, types, data, fromTimestamp, toTimestamp } = action.payload
		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue
			if (!Object.keys(data).includes(type)) data[type] = new Array()

			newState[nodeId][type].graphView = {
				...newState[nodeId][type].graphView,
				data: data[type],
				fromTimestamp,
				toTimestamp,
				fetching: false,
				fetched: true
			}
		}
		break
	}
	case FETCH_MEASUREMENTS_GRAPHVIEW_REJECTED: {
		const { nodeId, error, types } = action.payload
		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue

			newState[nodeId][type].graphView = {
				...newState[nodeId][type].graphView,
				fetching: false,
				fetched: false,
				error: error
			}
		}
		break
	}
	case FETCH_MEASUREMENTS_LAST: {
		const { nodeId, types } = action.payload
		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue
			newState[nodeId][type].lastMeasurement = {
				...newState[nodeId][type].lastMeasurement,
				fetching: true,
				error: null
			}
		}
		break
	}
	case FETCH_MEASUREMENTS_LAST_FULFILLED: {
		var { nodeId, types, data } = action.payload
		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue
			if (!Object.keys(data).includes(type)) data[type] = [{ value: false }]

			newState[nodeId][type].lastMeasurement = {
				...newState[nodeId][type].lastMeasurement,
				...data[type][0],
				fetching: false,
				fetched: true,
				lastFetched: Date.now()
			}
		}
		break
	}
	case FETCH_MEASUREMENTS_LAST_REJECTED: {
		const { nodeId, types, error } = action.payload
		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue

			newState[nodeId][type].lastMeasurement = {
				...newState[nodeId][type].lastMeasurement,
				fetching: false,
				fetched: false,
				error
			}
		}
		break
	}
	case FETCH_MEASUREMENTS_AGGREGATE: {
		const { nodeId, types, intervalName, aggregate } = action.payload
		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue
			if (
				!Object.keys(newState[nodeId][type].aggregates).includes(intervalName)
			)
				continue
			if (
				!Object.keys(
					newState[nodeId][type].aggregates[intervalName]
				).includes(aggregate)
			)
				continue

			newState[nodeId][type].aggregates[intervalName][aggregate] = {
				...newState[nodeId][type].aggregates[intervalName][aggregate],
				fetching: true,
				error: null
			}
		}
		break
	}
	case FETCH_MEASUREMENTS_AGGREGATE_FULFILLED: {
		const {
			nodeId,
			types,
			data,
			intervalName,
			aggregate,
			fetchedTimestamp
		} = action.payload
		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue
			if (
				!Object.keys(newState[nodeId][type].aggregates).includes(intervalName)
			)
				continue
			if (
				!Object.keys(
					newState[nodeId][type].aggregates[intervalName]
				).includes(aggregate)
			)
				continue

			newState[nodeId][type].aggregates[intervalName][aggregate] = {
				...newState[nodeId][type].aggregates[intervalName][aggregate],
				fetching: false,
				fetched: true,
				error: null,
				value: data[type] && data[type][0] ? data[type][0].value : false,
				lastUpdated: fetchedTimestamp
			}
		}
		break
	}
	case FETCH_MEASUREMENTS_AGGREGATE_REJECTED: {
		const { nodeId, error, intervalName, aggregate, types } = action.payload
		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue
			if (
				!Object.keys(newState[nodeId][type].aggregates).includes(intervalName)
			)
				continue
			if (
				!Object.keys(
					newState[nodeId][type].aggregates[intervalName]
				).includes(aggregate)
			)
				continue

			newState[nodeId][type].aggregates[intervalName][aggregate] = {
				...newState[nodeId][type].aggregates[intervalName][aggregate],
				fetching: false,
				fetched: false,
				error: error
			}
		}
		break
	}
	}
	return newState
}
