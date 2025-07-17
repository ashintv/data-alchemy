"use client"
import { Client, useDataStore } from "@/lib/store/data"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import axios from "axios"
interface ClientDataProps {
	setFocus: (value: boolean) => void
	data: Client
}
export function ClientData({ setFocus, data }: ClientDataProps) {
	const [clientData, setClientData] = useState<Client>(data)
	const { clients, setClients } = useDataStore()
	const [newAttrKey, setNewAttrKey] = useState("")
	const [newAttrValue, setNewAttrValue] = useState("")
	const [errors, setErrors] = useState<Record<string, string>>({})
	const handleChange = (field: keyof Client, value: string) => {
		const updatedClient = { ...clientData, [field]: value }
		let error = ""
		if (field === "PriorityLevel") {
			const num = Number(value)
			if (isNaN(num) || num < 1 || num > 5) {
				error = "Priority must be an integer between 1 and 5"
			}
		}

		//ROUBUST validation
		// duplicate check and //name chaek
		// task can be seleted from a drop dowm menu

		setErrors((prev) => ({
			...prev,
			[field]: error,
		}))
		setClientData(updatedClient)
	}

	const handleSave = async () => {
		// const updated = clients.map((x) => (x.ClientID === clientData.ClientID ? clientData : x))
		// await axios.post("http://localhost:3000/api/data", {
		// 	formData: {
		// 		clients: updated,
		// 		workers: [],
		// 		tasks: [],
		// 	},
		// })
		// setClients((clients) => clients.map((client, i) => (i === index ? { ...client, [field]: value } : client)))
		// console.table(updated)
		// setFocus(false)
	}
	const handleAttributeChange = (changedKey: string, newValue: string) => {
		try {
			const parsed = JSON.parse(clientData.AttributesJSON)
			parsed[changedKey] = newValue
			handleChange("AttributesJSON", JSON.stringify(parsed))
		} catch (e) {
			console.error("Atleast one attribute requires")
		}
	}

	const handleAttributeDelete = (keyToDelete: string) => {
		try {
			const parsed = JSON.parse(clientData.AttributesJSON)
			delete parsed[keyToDelete]
			handleChange("AttributesJSON", JSON.stringify(parsed))
		} catch (e) {
			handleChange("AttributesJSON", JSON.stringify({}))
		}
	}

	const handleAddAttribute = () => {
		if (!newAttrKey) return
		try {
			const parsed = JSON.parse(clientData.AttributesJSON)
			parsed[newAttrKey] = newAttrValue
			handleChange("AttributesJSON", JSON.stringify(parsed))
		} catch (e) {
			const parsed: Record<string, string> = {
				key: clientData.AttributesJSON,
			}
			parsed[newAttrKey] = newAttrValue
			handleChange("AttributesJSON", JSON.stringify(parsed))
		} finally {
			setNewAttrKey("")
			setNewAttrValue("")
		}
	}

	const parseAttributes = (obj: string) => {
		try {
			return Object.entries(JSON.parse(obj))
		} catch (e) {
			return Object.entries({
				key: obj,
			})
		}
	}

	const parsedAttributes = parseAttributes(clientData.AttributesJSON)

	return (
		<div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm">
			<div className="bg-background p-5 rounded-2xl shadow-lg w-2/3 overflow-auto relative">
				<div className="flex items-center justify-center text-2xl font-extrabold font-sans text-primary mb-5">Edit Client Data</div>

				<div className="flex items-center mb-3">
					<div className="font-bold mx-5 w-40">Client ID:</div>
					<Input value={clientData.ClientID} onChange={(e) => handleChange("ClientID", e.target.value)} />
					{errors.ClientID && <p className="text-red-500 text-xs">{errors.ClientID}</p>}
				</div>

				<div className="flex items-center mb-3">
					<div className="font-bold mx-5 w-40">Client Name:</div>
					<Input value={clientData.ClientName} onChange={(e) => handleChange("ClientName", e.target.value)} />
					{errors.ClientName && <p className="text-red-500 text-xs">{errors.ClientName}</p>}
				</div>

				<div className="flex items-center mb-3">
					<div className="font-bold mx-5 w-40">Priority:</div>
					<Input type="number" value={clientData.PriorityLevel} onChange={(e) => handleChange("PriorityLevel", Number(e.target.value).toString())} />
					{errors.PriorityLevel && <p className="text-red-500 text-xs">{errors.PriorityLevel}</p>}
				</div>

				<div className="flex items-center mb-3">
					<div className="font-bold mx-5 w-40">Requested Tasks:</div>
					<Input
						value={clientData.RequestedTaskIDs.split(",").join(", ")}
						onChange={(e) => handleChange("RequestedTaskIDs", e.target.value.replace(/\s+/g, ""))}
					/>
					{errors.RequestedTaskIDs && <p className="text-red-500 text-xs">{errors.RequestedTaskIDs}</p>}
				</div>

				<div className="flex items-center mb-3">
					<div className="font-bold mx-5 w-40">Group Tag:</div>
					<Input value={clientData.GroupTag.replace("Group", "")} onChange={(e) => handleChange("GroupTag", `Group${e.target.value}`)} />
					{errors.GroupTag && <p className="text-red-500 text-xs">{errors.GroupTag}</p>}
				</div>

				<div className="flex items-start mb-5">
					<div className="font-bold mx-5 w-40">Attributes:</div>
					<div className="flex flex-col gap-2 w-full">
						{parsedAttributes && Array.isArray(parsedAttributes) ? (
							parsedAttributes.map(([key, value]) => (
								<div key={key} className="flex items-center gap-2 border p-2 rounded">
									<Input value={key} readOnly className="w-40 text-primary" />
									<span>:</span>
									<Input value={value?.toString()} onChange={(e) => handleAttributeChange(key, e.target.value)} className="flex-1" />
									<Button variant="destructive" size="sm" onClick={() => handleAttributeDelete(key)}>
										Delete
									</Button>
								</div>
							))
						) : (
							<div className="text-red-500">Invalid JSON: {clientData.AttributesJSON}</div>
						)}
					</div>
				</div>

				{/* Add new attribute */}
				<div className="flex items-center gap-2 mb-5">
					<Input placeholder="New key" value={newAttrKey} onChange={(e) => setNewAttrKey(e.target.value)} className="w-40" />
					<span>:</span>
					<Input placeholder="New value" value={newAttrValue} onChange={(e) => setNewAttrValue(e.target.value)} className="flex-1" />
					<Button size="sm" onClick={handleAddAttribute}>
						Add
					</Button>
				</div>

				<div className="flex w-full justify-end gap-2">
					<Button onClick={handleSave}>Save</Button>
					<Button variant="secondary" onClick={() => setFocus(false)}>
						Close
					</Button>
				</div>
			</div>
		</div>
	)
}
