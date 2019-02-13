import { cloneDeep } from 'lodash'

import {
	FETCH_MEASUREMENTS_INTERVAL,
	FETCH_MEASUREMENTS_INTERVAL_FULFILLED,
	FETCH_MEASUREMENTS_INTERVAL_REJECTED,
	FETCH_MEASUREMENTS_LAST,
	FETCH_MEASUREMENTS_LAST_FULFILLED,
	FETCH_MEASUREMENTS_LAST_REJECTED
} from '../actions/measurementsActionTypes'

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
					const intervals = [
						{ name: 'lastHour', duration: 1, textDisplay: 'Last Hour' },
						{ name: 'lastDay', duration: 1, textDisplay: 'Last Day' },
						{ name: 'lastWeek', duration: 1, textDisplay: 'Last Week' }
					]

					for (const interval of intervals) {
						aggregates[interval.name] = {
							duration: interval.duration,
							textDisplay: interval.textDisplay
						}
						for (const valid_aggregate of VALID_AGGREGATES) {
							aggregates[interval.name][valid_aggregate] = {
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
	}
	}
	return newState
}
