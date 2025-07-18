"use client"
import { useDataStore } from "@/lib/store/data"
import axios from "axios"
import Papa from "papaparse"
import { redirect } from "next/navigation"
import { Input } from "../input"
import { Button } from "../button"

export default function UploadSection() {
	const { setClients, setWorkers, setTasks} = useDataStore()
	const handleClients = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (result) => {
				const data = result.data as any[]
				setClients(() => data)
			},
		})
	}
	const handleWorkers = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (result) => {
				const data = result.data as any[]
				setWorkers(() => data)
			},
		})
	}

	const handleTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (result) => {
				const data = result.data as any[]
				setTasks(() => data)
			},
		})
	}
	function putData() {
		console.log("Data uploaded successfully")
		redirect("/dashboard")
	}
	return (
		<div className="flex flex-col items-center w-full gap-4 p-6 rounded">
			<label className="block font-bold">Upload Clients CSV</label>
			<Input type="file" accept=".csv" onChange={handleClients} className="border border-gray-300 rounded" />

			<label className="block font-bold mt-4">Upload Workers CSV</label>
			<Input type="file" accept=".csv" onChange={handleWorkers} className="border border-gray-300 rounded" />

			<label className="block font-bold mt-4">Upload Tasks CSV</label>
			<Input type="file" accept=".csv" onChange={handleTasks} className="border border-gray-300 rounded" />

			<Button onClick={putData} className="mt-6">
				Submit
			</Button>
		</div>
	)
}
