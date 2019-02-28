import axios from 'axios'

import { apiConfig } from '../../../config/constants'

import {
	FETCH_MEASUREMENTS_GRAPHVIEW,
	FETCH_MEASUREMENTS_GRAPHVIEW_FULFILLED,
	FETCH_MEASUREMENTS_GRAPHVIEW_REJECTED
} from '../types'

export default function fetchMeasurementsGraphView(args) {
	return (dispatch, getState) => {
		var { nodeId, types, fromTimestamp, toTimestamp } = args

		types = types || Object.keys(getState().measurements[nodeId])

		fromTimestamp =
			fromTimestamp ||
			getState().measurements[nodeId][types[0]].graphView.fromTimestamp

		dispatch({
			type: FETCH_MEASUREMENTS_GRAPHVIEW,
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
					type: FETCH_MEASUREMENTS_GRAPHVIEW_FULFILLED,
					payload: {
						nodeId,
						types,
						data: response.data.data,
						fromTimestamp,
						toTimestamp
					}
				})
			})
			.catch(error => {
				dispatch({
					type: FETCH_MEASUREMENTS_GRAPHVIEW_REJECTED,
					payload: { nodeId, error, types }
				})
			})
	}
}
