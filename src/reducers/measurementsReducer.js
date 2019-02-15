import { cloneDeep } from 'lodash'

import {
	PUSH_MEASUREMENT,
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

const measurementElementSkeleton = {
	websocket: false, // Should contain websocket object when connected
	typesSubscribedTo: new Array(),
	...(() => {
		var measurements = new Object()
		for (const type of MEASUREMENT_TYPES) {
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
				fromTimestamp: false,
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
				error: null
			}
		}
		return measurements
	})()
}

export default function reducer(
	state = new Object(), // Should be sparse array with key=nodeId
	action
) {
	var newState = cloneDeep(state)

	switch (action.type) {
	case PUSH_MEASUREMENT: {
		const { nodeId, initialState } = action.payload
		if (initialState) {
			newState[nodeId] = initialState
		} else {
			newState[nodeId] = measurementElementSkeleton
		}
		return newState
	}
	case FETCH_MEASUREMENTS_GRAPHVIEW: {
		const { nodeId, types } = action.payload
		for (const type of types) {
			newState[nodeId][type].graphView.fetching = true
			newState[nodeId][type].graphView.fetched = false
			newState[nodeId][type].graphView.error = null
		}
		return newState
	}
	case FETCH_MEASUREMENTS_GRAPHVIEW_FULFILLED: {
		const { nodeId, data, fromTimestamp, toTimestamp } = action.payload
		for (const type in data) {
			newState[nodeId][type].graphView = {
				data: data[type],
				fromTimestamp: fromTimestamp,
				toTimestamp: toTimestamp,
				fetching: false,
				fetched: true
			}
		}
		return newState
	}
	case FETCH_MEASUREMENTS_GRAPHVIEW_REJECTED: {
		const { nodeId, error, types } = action.payload
		for (const type of types) {
			newState[nodeId][type].graphView.fetching = false
			newState[nodeId][type].graphView.fetched = false
			newState[nodeId][type].graphView.error = error
		}
		return newState
	}
	case FETCH_MEASUREMENTS_LAST: {
		const { nodeId, types } = action.payload
		for (const type of types) {
			newState[nodeId][type].lastMeasurement.fetching = true
			newState[nodeId][type].lastMeasurement.fetched = false
		}
		return newState
	}
	case FETCH_MEASUREMENTS_LAST_FULFILLED: {
		const { nodeId, data } = action.payload
		for (const type in data) {
			newState[nodeId][type].lastMeasurement = {
				...newState[nodeId][type].lastMeasurement,
				...data[type][0]
			}
			newState[nodeId][type].lastMeasurement.fetched = true
			newState[nodeId][type].lastMeasurement.fetching = false
		}
		return newState
	}
	case FETCH_MEASUREMENTS_LAST_REJECTED: {
		const { nodeId, error, types } = action.payload
		for (const type of types) {
			newState[nodeId][type].lastMeasurement.fetched = false
			newState[nodeId][type].lastMeasurement.fetching = false
			newState[nodeId][type].lastMeasurement.error = error
		}
		return newState
	}
	case FETCH_MEASUREMENTS_AGGREGATE: {
		const { nodeId, types, intervalName, aggregate } = action.payload
		for (const type of types) {
			newState[nodeId][type].aggregates[intervalName][
				aggregate
			].fetching = true
			newState[nodeId][type].aggregates[intervalName][
				aggregate
			].fetched = false
			newState[nodeId][type].aggregates[intervalName][aggregate].error = null
		}
		return newState
	}
	case FETCH_MEASUREMENTS_AGGREGATE_FULFILLED: {
		const {
			nodeId,
			data,
			intervalName,
			aggregate,
			types,
			fetchedTimestamp
		} = action.payload
		for (const type of types) {
			newState[nodeId][type].aggregates[intervalName][
				aggregate
			].fetching = false

			newState[nodeId][type].aggregates[intervalName][
				aggregate
			].fetched = true

			newState[nodeId][type].aggregates[intervalName][aggregate].value =
					typeof data[type] !== 'undefined' ? data[type][0].value : false

			newState[nodeId][type].aggregates[intervalName][
				aggregate
			].lastUpdated = fetchedTimestamp
		}
		return newState
	}
	case FETCH_MEASUREMENTS_AGGREGATE_REJECTED: {
		const { nodeId, error, intervalName, aggregate, types } = action.payload
		for (const type of types) {
			newState[nodeId][type].aggregates[intervalName][
				aggregate
			].fetching = false
			newState[nodeId][type].aggregates[intervalName][
				aggregate
			].fetched = false
			newState[nodeId][type].aggregates[intervalName][aggregate].error = error
		}
		return newState
	}
	}
	return newState
}
