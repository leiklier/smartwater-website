import refreshMeasurements from './refreshMeasurements'
import fetchMeasurementsGraphview from './fetchMeasurementsGraphview'
import fetchMeasurementsLast from './fetchMeasurementsLast'
import fetchMeasurementsAggregate from './fetchMeasurementsAggregate'

export default function reducer(
	state = {
		measurements: new Object() // Sparce array with key=nodeId
	},
	action
) {
	return (
		refreshMeasurements(state, action) ||
		fetchMeasurementsGraphview(state, action) ||
		fetchMeasurementsLast(state, action) ||
		fetchMeasurementsAggregate(state, action) ||
		state
	)
}