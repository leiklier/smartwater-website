export function modeToIconType(mode) {
	var iconType

	switch (mode) {
	case 'quickview': {
		iconType = 'table'
		break
	}
	case 'aggregatesTable': {
		iconType = 'line-chart'
		break
	}
	default:
		iconType = 'close-circle'
	}

	return iconType
}
