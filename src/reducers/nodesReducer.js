import { cloneDeep } from 'lodash'

import {
	FETCH_NODES,
	FETCH_NODES_FULFILLED,
	FETCH_NODES_REJECTED
} from '../actions/nodesActionTypes'

export default function(
	state = {
		fetching: false,
		fetched: false,
		error: null,
		nodes: new Object()
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
			nodes: {
				...newState.nodes,
				...newNodes
			},
			fetching: false,
			fetched: true
		}
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
