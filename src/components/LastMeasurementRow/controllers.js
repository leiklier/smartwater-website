import React from 'react'
import { Icon, Tooltip, Typography } from 'antd'
const { Text } = Typography

import { formatValue } from '../../controllers'

export function valueToIcon(value, format, fetching, tooLow, tooHigh) {
	var iconType, iconColor, tooLowFormatted, tooHighFormatted

	if (fetching) {
		return <Icon type="loading" style={{ fontSize: '48px' }} />
	} else if (value === false) {
		return (
			<Icon
				type="close-circle"
				style={{ color: 'rgba(0, 0, 0, .25)', fontSize: '48px' }}
			/>
		)
	} else if (value <= tooLow) {
		iconType = 'close-circle'
		iconColor = '#f5222d'
		tooLowFormatted = <Text type="danger">{formatValue(tooLow, format)}</Text>
		tooHighFormatted = formatValue(tooHigh, format)
		//
	} else if (value >= tooHigh) {
		iconType = 'close-circle'
		iconColor = '#f5222d'
		tooLowFormatted = formatValue(tooLow, format)
		tooHighFormatted = <Text type="danger">{formatValue(tooHigh, format)}</Text>
		//
	} else if (value < tooLow + 0.1 * (tooHigh - tooLow)) {
		iconType = 'exclamation-circle'
		iconColor = '#faad14'
		tooLowFormatted = <Text type="warning">{formatValue(tooLow, format)}</Text>
		tooHighFormatted = formatValue(tooHigh, format)
		//
	} else if (value > tooHigh - 0.1 * (tooHigh - tooLow)) {
		iconType = 'exclamation-circle'
		iconColor = '#faad14'
		tooLowFormatted = formatValue(tooLow, format)
		tooHighFormatted = (
			<Text type="warning">{formatValue(tooHigh, format)}</Text>
		)
		//
	} else {
		iconType = 'check-circle'
		iconColor = '#52c41a'
		tooLowFormatted = formatValue(tooLow, format)
		tooHighFormatted = formatValue(tooHigh, format)
	}

	const tooltipText = (
		<Text style={{ color: 'white' }}>
			Value should be between {tooLowFormatted} and {tooHighFormatted}.
		</Text>
	)

	return (
		<Tooltip title={tooltipText} placement="bottomLeft">
			<Icon
				type={iconType}
				theme="twoTone"
				twoToneColor={iconColor}
				style={{ fontSize: '48px' }}
			/>
		</Tooltip>
	)
}


