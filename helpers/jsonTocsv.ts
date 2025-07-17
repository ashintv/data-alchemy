 export function jsonToCSV(items: Record<string, any>[]) {
	if (items.length === 0) return ""
	const headers = Object.keys(items[0])
	const rows = items.map((obj) =>
		headers
			.map((field) => {
				const value = obj[field] ?? ""
				// Quote strings if needed
				const escaped = String(value).replace(/"/g, '""')
				return `"${escaped}"`
			})
			.join(",")
	)

	return [headers.join(","), ...rows].join("\n")
}