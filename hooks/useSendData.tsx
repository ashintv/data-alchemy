"use client"
import { useDataStore } from "@/lib/store/data"
import axios from "axios"
import { useEffect } from "react"

export function useSenData(data: any) {
	const { clients, workers, tasks } = useDataStore()
	async function sendData() {
		await axios.post("http://localhost:3000/api/data", {
			formData: {
				clients,
				workers,
				tasks,
			},
		})
	}
	useEffect(() => {
		const timer = setTimeout(() => {
			sendData()
		}, 1000)

		return () => clearTimeout(timer)
	}, [data, clients, workers, tasks])
}
