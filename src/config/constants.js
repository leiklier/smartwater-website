export const MEASUREMENT_TYPES = [
	'BATTERY',
	'TEMPERATURE',
	'TURBIDITY',
	'DISSOLVED_OXYGEN',
	'PH',
	'CONDUCTIVITY'
]

export const VALID_AGGREGATES = ['HIGHEST', 'LOWEST', 'AVERAGE']

export const apiConfig = {
	host: 'http://vannovervakning.com:5000/',
	basePath: 'api/v1/',
	measurementsPath: 'measurements/',
	nodesPath: 'nodes/',
	wsSupport: true
}

export const MEASUREMENT_INTERVALS = {
	lastHour: {
		duration: 1000 * 60 * 60,
		textDisplay: 'Last Hour'
	},
	lastDay: {
		duration: 1000 * 60 * 60 * 24,
		textDisplay: 'Last Day'
	},
	lastWeek: {
		duration: 1000 * 60 * 60 * 24 * 7,
		textDisplay: 'Last Week'
	}
}
