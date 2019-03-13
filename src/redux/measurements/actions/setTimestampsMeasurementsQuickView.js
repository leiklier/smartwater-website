import { SET_TIMESTAMPS_MEASUREMENTS_QUICKVIEW } from '../types'

import { refetchAllMeasurementsQuickView } from '.'

export default function setTimestampsMeasurementsQuickView(
	fromTimestamp,
	toTimestamp
) {
	return (dispatch, getState) => {
		dispatch({
			type: SET_TIMESTAMPS_MEASUREMENTS_QUICKVIEW,
			payload: {
				fromTimestamp,
				toTimestamp
			}
		})
		dispatch(refetchAllMeasurementsQuickView())
	}
}
