import { cloneDeep } from 'lodash'

import { pushMeasurement } from '../actions/measurementsActions'
import {
	FETCH_NODES,
	FETCH_NODES_FULFILLED,
	FETCH_NODES_REJECTED
} from '../actions/nodesActionTypes'

export default function(
	state = {
		fetching: false,
		fetched: false,
		error: null
	}, // Should be sparse array with key=nodeId
	action
) {
	var newState = cloneDeep(state)
	switch (action.type) {
	case FETCH_NODES: {
		newState = {
			...newState,
			fetching: true,
			fetched: false,
			error: null
		}
		break
	}
	case FETCH_NODES_FULFILLED: {
		const newNodes = action.payload
		newState = {
			...newState,
			...newNodes,
			fetching: false,
			fetched: true
		}
		// for (const nodeId in newNodes) {
		// 	// Does not currently work
		// 	pushMeasurement(nodeId)
		// }
		break
	}
	case FETCH_NODES_REJECTED: {
		const { error } = action.payload
		newState = {
			...newState,
			fetching: false,
			fetched: false,
			error: error
		}
		break
	}
	}
	return newState
}
