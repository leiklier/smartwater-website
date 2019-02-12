import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import measurements from './measurementsReducer'

export default history =>
	combineReducers({
		router: connectRouter(history),
		measurements
	})
