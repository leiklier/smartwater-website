import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { websocketMeasurementsMiddleware } from './measurements/middlewares'

import createRootReducer from './reducers'

export const history = createBrowserHistory()

const middleware = applyMiddleware(
	routerMiddleware(history), // for dispatching history actions
	thunk,
	createLogger(),
	websocketMeasurementsMiddleware()
)

export default function configureStore(preloadedState) {
	const store = createStore(
		createRootReducer(history), // root reducer with router state
		preloadedState,
		compose(middleware)
	)
	return store
}
