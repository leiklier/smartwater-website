import { cloneDeep } from 'lodash'

import {
	FETCH_MEASUREMENTS_LAST,
	FETCH_MEASUREMENTS_LAST_FULFILLED,
	FETCH_MEASUREMENTS_LAST_REJECTED
} from '../types'

export default function fetchMeasurementsLast(state, action) {
	switch (action.type) {
	case FETCH_MEASUREMENTS_LAST: {
		const { nodeId, types } = action.payload
		let newState = cloneDeep(state)

		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue
			newState[nodeId][type].lastMeasurement = {
				...newState[nodeId][type].lastMeasurement,
				fetching: true,
				error: null
			}
		}

		return newState
	}

	case FETCH_MEASUREMENTS_LAST_FULFILLED: {
		let { nodeId, types, data } = action.payload
		let newState = cloneDeep(state)

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

		return newState
	}

	case FETCH_MEASUREMENTS_LAST_REJECTED: {
		const { nodeId, types, error } = action.payload
		let newState = cloneDeep(state)

		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue

			newState[nodeId][type].lastMeasurement = {
				...newState[nodeId][type].lastMeasurement,
				fetching: false,
				fetched: false,
				error
			}
		}

		return newState
	}

	default:
		return
	}
}
