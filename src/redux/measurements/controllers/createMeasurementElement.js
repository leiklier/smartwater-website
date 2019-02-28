import {
	MEASUREMENT_INTERVALS,
	MEASUREMENT_TYPES,
	VALID_AGGREGATES
} from '../../../config/constants'

export default function createMeasurementElement(types = false) {
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
					fromTimestamp: Date.now() - 1000 * 60 * 60 * 24,
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
