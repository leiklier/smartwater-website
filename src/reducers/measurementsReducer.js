export default function reducer(
	state = {
		websocket: false, // Should contain websocket object when connected
		fetching: false,
		fetched: false,
		error: null,
		measurements: []
	},
	action
) {
	switch (action.type) {
	case 'FETCH_MEASUREMENTS': {
		return { ...state, fetching: true }
	}
	case 'FETCH_MEASUREMENTS_REJECTED': {
		return { ...state, fetching: false, error: action.payload }
	}
	}

	return state
}
