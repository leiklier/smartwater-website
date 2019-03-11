import axios from 'axios'

import { apiConfig } from '../../../config/constants'

import {
	FETCH_MEASUREMENTS_QUICKVIEW,
	FETCH_MEASUREMENTS_QUICKVIEW_FULFILLED,
	FETCH_MEASUREMENTS_QUICKVIEW_REJECTED
} from '../types'

export default function fetchMeasurementsQuickView(nodeId, types = false) {
	return (dispatch, getState) => {
		const { measurements } = getState().measurements
		const { fromTimestamp, toTimestamp } = getState().measurements.quickView

		types = types || Object.keys(measurements[nodeId])

		dispatch({
			type: FETCH_MEASUREMENTS_QUICKVIEW,
			payload: { nodeId, types }
		})

		var queryUrl =
			apiConfig.host +
			apiConfig.basePath +
			apiConfig.measurementsPath +
			`${nodeId}/` +
			`${fromTimestamp}/`

		queryUrl += toTimestamp ? `${toTimestamp}/` : ''
		queryUrl += `?types=${types.join(',')}`

		return axios
			.get(queryUrl)
			.then(response => {
				dispatch({
					type: FETCH_MEASUREMENTS_QUICKVIEW_FULFILLED,
					payload: {
						nodeId,
						types,
						data: response.data.data
					}
				})
			})
			.catch(error => {
				dispatch({
					type: FETCH_MEASUREMENTS_QUICKVIEW_REJECTED,
					payload: {
						nodeId,
						types,
						error
					}
				})
			})
	}
}
