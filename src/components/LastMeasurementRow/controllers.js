import React from 'react'
import { Icon } from 'antd'

export function valueToIcon(value, fetching, tooLow, tooHigh) {
	var icon
	if (fetching) {
		icon = <Icon type="loading" style={{ fontSize: '48px' }} />
	} else if (value < tooLow || value > tooHigh) {
		icon = (
			<Icon
				type="close-circle"
				theme="twoTone"
				twoToneColor="#f5222d"
				style={{ fontSize: '48px' }}
			/>
		)
	} else if (value < tooLow * 1.15 || value > tooHigh * 0.85) {
		icon = (
			<Icon
				type="exclamation-circle"
				theme="twoTone"
				twoToneColor="#faad14"
				style={{ fontSize: '48px' }}
			/>
		)
	} else {
		icon = (
			<Icon
				type="check-circle"
				theme="twoTone"
				twoToneColor="#52c41a"
				style={{ fontSize: '48px' }}
			/>
		)
	}

	return icon
}

export function formatValue(value, format) {
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
