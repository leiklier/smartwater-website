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
	hostWs: 'ws://vannovervakning.com:5000/',
	basePath: 'api/v1/',
	measurementsPath: 'measurements/',
	nodesPath: 'nodes/',
	wsSupport: true
}

export const MEASUREMENT_INTERVALS = {
	lastDay: {
		duration: 1000 * 60 * 60 * 24
	},
	lastWeek: {
		duration: 1000 * 60 * 60 * 24 * 7
	},
	lastMonth: {
		duration: 1000 * 60 * 60 * 24 * 30
	}
}
