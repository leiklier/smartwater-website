export default function formatValue(value, format) {
	var formattedValue
	switch (format) {
	case 'PERCENTAGE': {
		formattedValue = `${value * 100}%`
		break
	}

	case 'DEGREES_CELCIUS': {
		formattedValue = `${value}°C`
		break
	}

	case 'INTEGER': {
		formattedValue = Math.round(value)
		break
	}

	case 'FLOAT': {
		formattedValue = value.toFixed(2) // keep only two decimals
		break
	}

	case 'OPEN_CLOSED': {
		if (value === 1) {
			formattedValue = 'Closed'
		} else {
			formattedValue = 'Open'
		}
		break
	}

	default:
		formattedValue = value
	}

	return formattedValue
}
