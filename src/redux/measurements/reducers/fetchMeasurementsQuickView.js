import { cloneDeep } from 'lodash'

import {
	FETCH_MEASUREMENTS_QUICKVIEW,
	FETCH_MEASUREMENTS_QUICKVIEW_FULFILLED,
	FETCH_MEASUREMENTS_QUICKVIEW_REJECTED
} from '../types'

export default function fetchMeasurementsQuickView(state, action) {
	switch (action.type) {
	case FETCH_MEASUREMENTS_QUICKVIEW: {
		const { nodeId, types } = action.payload
		let newState = cloneDeep(state)

		for (const type of types) {
			if (!Object.keys(newState.measurements[nodeId]).includes(type)) continue

			newState.measurements[nodeId][type].quickView = {
				...newState.measurements[nodeId][type].quickView,
				fetching: true,
				fetched: false,
				error: null
			}
		}

		return newState
	}

	case FETCH_MEASUREMENTS_QUICKVIEW_FULFILLED: {
		const { nodeId, types, data } = action.payload
		let newState = cloneDeep(state)

		for (const type of types) {
			if (!Object.keys(newState.measurements[nodeId]).includes(type)) continue
			if (!Object.keys(data).includes(type)) data[type] = new Array()
			newState.measurements[nodeId][type].quickView = {
				...newState.measurements[nodeId][type].quickView,
				data: data[type],
				fetching: false,
				fetched: true
			}
		}

		return newState
	}

	case FETCH_MEASUREMENTS_QUICKVIEW_REJECTED: {
		const { nodeId, types, error } = action.payload
		let newState = cloneDeep(state)

		for (const type of types) {
			if (!Object.keys(newState.measurements[nodeId]).includes(type)) continue

			newState.measurements[nodeId][type].quickView = {
				...newState.measurements[nodeId][type].quickView,
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
