import {
	MEASUREMENT_INTERVALS,
	VALID_AGGREGATES
} from '../../../config/constants'

export default function createMeasurementElement() {
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

	var quickView = {
		data: new Array(),
		fetching: false,
		fetched: false,
		error: null
	}

	var graphView = {
		data: new Array(),
		fromTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 7,
		toTimestamp: false,
		fetching: false,
		fetched: false,
		error: null
	}

	var compareView = {
		data: new Array(),
		fetching: false,
		fetched: false,
		error: null
	}

	var lastMeasurement = {
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

	var measurement = {
		aggregates,
		quickView,
		graphView,
		compareView,
		lastMeasurement
	}
	return measurement
}
