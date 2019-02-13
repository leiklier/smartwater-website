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
	wsSupport: true
}
