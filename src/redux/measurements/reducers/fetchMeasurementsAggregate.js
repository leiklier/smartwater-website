import { cloneDeep } from 'lodash'

import {
	FETCH_MEASUREMENTS_AGGREGATE,
	FETCH_MEASUREMENTS_AGGREGATE_FULFILLED,
	FETCH_MEASUREMENTS_AGGREGATE_REJECTED
} from '../types'

export default function fetchMeasurementsAggregate(state, action) {
	switch (action.type) {
	case FETCH_MEASUREMENTS_AGGREGATE: {
		const { nodeId, types, intervalName, aggregate } = action.payload
		let newState = cloneDeep(state)

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

		return newState
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
		let newState = cloneDeep(state)

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
		return newState
	}

	case FETCH_MEASUREMENTS_AGGREGATE_REJECTED: {
		const { nodeId, error, intervalName, aggregate, types } = action.payload
		let newState = cloneDeep(state)

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

		return newState
	}

	default:
		return
	}
}
