import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import measurements from './measurementsReducer'
import nodes from './nodesReducer'

export default history =>
	combineReducers({
		router: connectRouter(history),
		nodes,
		measurements
	})
