import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import sites from './sites/reducers'
import nodes from './nodes/reducers'
import measurements from './measurements/reducers'

export default history =>
	combineReducers({
		router: connectRouter(history),
		sites,
		nodes,
		measurements
	})
