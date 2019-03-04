import {
	fetchNodes,
	refreshMeasurements,
	subscribeWebsocketMeasurements
} from '../../actions'

export default function fetchAndConfigureStore() {
	return dispatch => {
		dispatch(fetchNodes())
			.then(() => dispatch(refreshMeasurements()))
			.then(() => dispatch(subscribeWebsocketMeasurements()))
	}
}
