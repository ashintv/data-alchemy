import { ClientSchema } from "@/lib/schema/client"
import { Client, useDataStore } from "@/lib/store/data"
import { checkErrors } from "@/lib/validators/cliient-validator"
import { useCallback } from "react"
import { useShallow } from 'zustand/react/shallow'


export function useClientUpdate() {
	const { clients, setClients } = useDataStore(useShallow(s => s))
	const handleChange = useCallback((index: number, field: string, value: string) => {
		setClients((clients) => clients.map((client, i) => (i === index ? { ...client, [field]: value } : client)))
	}, [setClients])
	return { handleChange } 
}
