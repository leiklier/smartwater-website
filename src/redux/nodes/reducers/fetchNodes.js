import { cloneDeep } from 'lodash'

import {
	FETCH_NODES,
	FETCH_NODES_FULFILLED,
	FETCH_NODES_REJECTED
} from '../types'

export default function fetchNodes(state, action) {
	switch (action.type) {
	case FETCH_NODES: {
		let newState = cloneDeep(state)

		newState = {
			...newState,
			fetching: true,
			fetched: false,
			error: null
		}

		return newState
	}

	case FETCH_NODES_FULFILLED: {
		const newNodes = action.payload
		let newState = cloneDeep(state)

		newState = {
			...newState,
			nodes: {
				...newState.nodes,
				...newNodes
			},
			fetching: false,
			fetched: true
		}

		return newState
	}

	case FETCH_NODES_REJECTED: {
		const { error } = action.payload
		let newState = cloneDeep(state)

		newState = {
			...newState,
			fetching: false,
			fetched: false,
			error: error
		}

		return newState
	}

	default:
		return
	}
}
