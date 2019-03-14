export default function formatType(type) {
	const formattedType = type.replace(/_/, ' ').replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})

	return formattedType
}
