import axios from 'axios'

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
				dispatch({
					type: FETCH_NODES_FULFILLED,
					payload: response.data
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
