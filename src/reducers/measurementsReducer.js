import { cloneDeep } from 'lodash'

import {
	FETCH_MEASUREMENTS_INTERVAL,
	FETCH_MEASUREMENTS_INTERVAL_FULFILLED,
	FETCH_MEASUREMENTS_INTERVAL_REJECTED
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
						{ name: 'last_hour', duration: 1, textDisplay: 'Last Hour' },
						{ name: 'last_day', duration: 1, textDisplay: 'Last Day' },
						{ name: 'last_week', duration: 1, textDisplay: 'Last Week' }
					]

					for (const interval of intervals) {
						aggregates[interval.name] = {
							duration: interval.duration,
							textDisplay: interval.textDisplay
						}
						for (const valid_aggregate of VALID_AGGREGATES) {
							aggregates[interval.name][valid_aggregate] = {
								value: false, // number
								lastUpdated: false, // timestamp
								fetching: false, // boolean
								fetched: false, // boolean
								error: null // error object
							}
						}
					}
					return aggregates
				})()

				// Data
				measurements[type].firstTimestamp = Date.now()
				measurements[type].lastTimestamp = Date.now()
				measurements[type].data = new Object()
				measurements[type].fetching = false // boolean
				measurements[type].fetched = false // boolean
				measurements[type].error = null // error object
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
			newState[type].fetching = true
		}
		return newState
	}
	case FETCH_MEASUREMENTS_INTERVAL_FULFILLED: {
		for (const measurementType in action.payload.data) {
			newState[measurementType].fetching = false
			newState[measurementType].fetched = true
			newState[measurementType].data = {
				...newState[measurementType].data,
				...action.payload.data
			}
		}
		return newState
	}
	case FETCH_MEASUREMENTS_INTERVAL_REJECTED: {
		for (const measurementType in action.payload.types) {
			newState[measurementType].fetching = false
			newState[measurementType].fetched = false
			newState[measurementType].error = action.payload.error
		}
		return { ...state, fetching: false, error: action.payload }
	}
	}
	return newState
}
