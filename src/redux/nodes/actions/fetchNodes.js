import axios from 'axios'

import { apiConfig } from '../../../config/constants'

import { refreshMeasurements } from '../../measurements/actions'

import {
	FETCH_NODES,
	FETCH_NODES_FULFILLED,
	FETCH_NODES_REJECTED
} from '../types'

export default function fetchNodes(args = {}) {
	const { nodeIds } = args

	const queryUrl = apiConfig.host + apiConfig.basePath + apiConfig.nodesPath

	return dispatch => {
		dispatch({ type: FETCH_NODES })

		return axios
			.get(queryUrl)
			.then(response => {
				const nodes = response.data
				dispatch({
					type: FETCH_NODES_FULFILLED,
					payload: nodes
				})
			})
			.then(() => {
				dispatch(refreshMeasurements())
			})
			.catch(err => {
				dispatch({
					type: FETCH_NODES_REJECTED,
					payload: {
						error: err
					}
				})
			})
	}
}
