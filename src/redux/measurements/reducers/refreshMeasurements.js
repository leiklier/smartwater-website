import { cloneDeep } from 'lodash'

import { createMeasurementElement } from '../controllers'
import { REFRESH_MEASUREMENTS } from '../types'

export default function refreshMeasurements(state, action) {
	switch (action.type) {
	case REFRESH_MEASUREMENTS: {
		let newState = cloneDeep(state)
		const { types } = action.payload

		for (const nodeId in types) {
			if (!newState[nodeId]) {
				newState[nodeId] = createMeasurementElement(types[nodeId])
				continue
			}
			for (const type of types[nodeId]) {
				if (!newState[nodeId][types]) {
					// TODO: Add new type here
				}
			}
		}

		return newState
	}

	default:
		return
	}
}
