import cycleSiteNodeviewMode from './cycleSiteNodeviewMode'

export default function reducer(
	state = {
		nodeview: {
			mode: 'quickview'
		}
	},
	action
) {
	return cycleSiteNodeviewMode(state, action) || state
}
