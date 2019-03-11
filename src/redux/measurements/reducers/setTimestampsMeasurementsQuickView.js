import { cloneDeep } from 'lodash'

import { SET_TIMESTAMPS_MEASUREMENTS_QUICKVIEW } from '../types'

export default function setTimestampsMeasurementsQuickView(state, action) {
	switch (action.type) {
	case SET_TIMESTAMPS_MEASUREMENTS_QUICKVIEW: {
		const { fromTimestamp, toTimestamp } = action.payload
		let newState = cloneDeep(state)

		newState.quickView = {
			...newState.quickView,
			fromTimestamp,
			toTimestamp
		}

		return newState
	}
	default:
		return
	}
}
