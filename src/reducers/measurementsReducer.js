import { cloneDeep } from 'lodash'

import {
	FETCH_MEASUREMENTS_INTERVAL,
	FETCH_MEASUREMENTS_INTERVAL_FULFILLED,
	FETCH_MEASUREMENTS_INTERVAL_REJECTED,
	FETCH_MEASUREMENTS_LAST,
	FETCH_MEASUREMENTS_LAST_FULFILLED,
	FETCH_MEASUREMENTS_LAST_REJECTED,
	FETCH_MEASUREMENTS_AGGREGATE,
	FETCH_MEASUREMENTS_AGGREGATE_FULFILLED,
	FETCH_MEASUREMENTS_AGGREGATE_REJECTED
} from '../actions/measurementsActionTypes'

import { MEASUREMENT_INTERVALS } from '../config/constants'

import { MEASUREMENT_TYPES, VALID_AGGREGATES } from '../config/constants'

export default function reducer(
	state = {
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
	},
	action
) {
	var newState = cloneDeep(state)

	switch (action.type) {
	case FETCH_MEASUREMENTS_INTERVAL: {
		for (const type of action.payload.types) {
			newState[type].graphView.fetching = true
			newState[type].graphView.fetched = false
			newState[type].graphView.error = null
		}
		return newState
	}
	case FETCH_MEASUREMENTS_INTERVAL_FULFILLED: {
		const { data, fromTimestamp, toTimestamp } = action.payload
		for (const type in action.payload.data) {
			newState[type].graphView = {
				data: data[type],
				fromTimestamp: fromTimestamp,
				toTimestamp: toTimestamp,
				fetching: false,
				fetched: true
			}
		}
		return newState
	}
	case FETCH_MEASUREMENTS_INTERVAL_REJECTED: {
		for (const type of action.payload.types) {
			newState[type].graphView.fetching = false
			newState[type].graphView.fetched = false
			newState[type].graphView.error = action.payload.error
		}
		return newState
	}
	case FETCH_MEASUREMENTS_LAST: {
		for (const type of action.payload.types) {
			newState[type].lastMeasurement.fetching = true
			newState[type].lastMeasurement.fetched = false
		}
		return newState
	}
	case FETCH_MEASUREMENTS_LAST_FULFILLED: {
		const { data } = action.payload
		for (const type in data) {
			newState[type].lastMeasurement = {
				...newState[type].lastMeasurement,
				...data[type][0]
			}
			newState[type].lastMeasurement.fetched = true
			newState[type].lastMeasurement.fetching = false
		}
		return newState
	}
	case FETCH_MEASUREMENTS_LAST_REJECTED: {
		const { error, types } = action.payload
		for (const type of types) {
			newState[type].lastMeasurement.fetched = false
			newState[type].lastMeasurement.fetching = false
			newState[type].lastMeasurement.error = error
		}
		return newState
	}
	case FETCH_MEASUREMENTS_AGGREGATE: {
		const { types, intervalName, aggregate } = action.payload
		for (const type of types) {
			newState[type].aggregates[intervalName][aggregate].fetching = true
			newState[type].aggregates[intervalName][aggregate].fetched = false
			newState[type].aggregates[intervalName][aggregate].error = null
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
			newState[type].aggregates[intervalName][aggregate].fetching = false
			newState[type].aggregates[intervalName][aggregate].fetched = true
			newState[type].aggregates[intervalName][aggregate].value =
					typeof data[type] !== 'undefined' ? data[type][0].value : false
			newState[type].aggregates[intervalName][
				aggregate
			].lastUpdated = fetchedTimestamp
		}
		return newState
	}
	case FETCH_MEASUREMENTS_AGGREGATE_REJECTED: {
		const { error, intervalName, aggregate, types } = action.payload
		for (const type of types) {
			newState[type].aggregates[intervalName][aggregate].fetching = false
			newState[type].aggregates[intervalName][aggregate].fetched = false
			newState[type].aggregates[intervalName][aggregate].error = error
		}
		return newState
	}
	}
	return newState
}
