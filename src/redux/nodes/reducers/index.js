import fetchNodes from './fetchNodes'

export default function reducer(
	state = {
		fetching: false,
		fetched: false,
		error: null,
		nodes: new Object() // Should be sparse array with key=nodeId
	},
	action
) {
	return fetchNodes(state, action) || state
}
