import { createMeasurementElement } from '.'

import { MEASUREMENT_TYPES } from '../../../config/constants'

export default function createMeasurementContainer(types = false) {
	types = types || MEASUREMENT_TYPES
	var measurements = new Object()

	for (const type of types) {
		measurements[type] = createMeasurementElement()
	}

	return measurements
}
