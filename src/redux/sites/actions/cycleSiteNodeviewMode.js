import { CYCLE_SITE_NODEVIEW_MODE } from '../types'

export default function cycleSiteNodeviewMode() {
	return dispatch => {
		dispatch({ type: CYCLE_SITE_NODEVIEW_MODE })
	}
}
