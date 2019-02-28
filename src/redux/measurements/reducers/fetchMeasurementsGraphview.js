import { cloneDeep } from 'lodash'

import {
	FETCH_MEASUREMENTS_GRAPHVIEW,
	FETCH_MEASUREMENTS_GRAPHVIEW_FULFILLED,
	FETCH_MEASUREMENTS_GRAPHVIEW_REJECTED
} from '../types'

export default function fetchMeasurementsGraphview(state, action) {
	switch (action.type) {
	case FETCH_MEASUREMENTS_GRAPHVIEW: {
		const { nodeId, types } = action.payload
		let newState = cloneDeep(state)

		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue

			newState[nodeId][type].graphView = {
				...newState[nodeId][type].graphView,
				fetching: true,
				fetched: false,
				error: null
			}
		}

		return newState
	}

	case FETCH_MEASUREMENTS_GRAPHVIEW_FULFILLED: {
		const { nodeId, types, data, fromTimestamp, toTimestamp } = action.payload
		let newState = cloneDeep(state)

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

		return newState
	}

	case FETCH_MEASUREMENTS_GRAPHVIEW_REJECTED: {
		const { nodeId, error, types } = action.payload
		let newState = cloneDeep(state)

		for (const type of types) {
			if (!Object.keys(newState[nodeId]).includes(type)) continue

			newState[nodeId][type].graphView = {
				...newState[nodeId][type].graphView,
				fetching: false,
				fetched: false,
				error: error
			}
		}

		return newState
	}

	default:
		return
	}
}
