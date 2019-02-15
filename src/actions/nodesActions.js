import axios from 'axios'

import { pushMeasurement } from './measurementsActions'

import { apiConfig } from '../config/constants'
import {
	FETCH_NODES,
	FETCH_NODES_FULFILLED,
	FETCH_NODES_REJECTED
} from './nodesActionTypes'

export function fetchNodes(args = {}) {
	const { nodeIds } = args

	const queryUrl = apiConfig.host + apiConfig.basePath + apiConfig.nodesPath

	return function(dispatch) {
		dispatch({ type: FETCH_NODES })
		axios
			.get(queryUrl)
			.then(response => {
				const nodes = response.data
				dispatch({
					type: FETCH_NODES_FULFILLED,
					payload: nodes
				})
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
