import Blob from 'blob'
import FileSaver from 'file-saver'
import json2csv from 'json2csv'

export default function downloadAsCsv(inputArray, fileName) {
	// Expects inputArray consisting of objects all with same keys
	const fields = Object.keys(inputArray[0])
	const options = { fields }

	try {
		const csv = json2csv.parse(inputArray, options)
		const fileToSave = new Blob([csv], {
			type: 'text/csv'
		})
		FileSaver.saveAs(fileToSave, fileName)
		return true
	} catch (e) {
		return false
	}
}
