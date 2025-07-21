"use client"
import { jsonToCSV } from "@/helpers/jsonTocsv"
import { useDataStore } from "@/lib/store/data"
import { Button } from "../ui/button"
import { Download } from "../icons/download"
export function DownloadCSV() {
	const { clients } = useDataStore()
	function handleDownload() {
		const csv = jsonToCSV(clients)
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
		const url = URL.createObjectURL(blob)
		const link = document.createElement("a")
		link.href = url
		link.setAttribute("download", "clients.csv")
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}
	return (
		<Button onClick={handleDownload} variant={'ghost'} className="px-4 py-2 hover:text-primary">
			<Download/>
		</Button>
	)
}
