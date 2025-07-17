"use client"
import { Worker } from "@/lib/store/data"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { DeleteIcon } from "../icons/delete"
import { Skills } from "../fields/worker/skills"
import { Field } from "../fields/worker/fileld"
import { AvlSlots } from "../fields/worker/slots"

export function WorkerEditor({ worker , setFocus }: { worker: Worker | null  , setFocus:(value:any)=>void }) {
	if (!worker) return null
	const [skills, setSkills] = useState<string[]>([])
	const [slotes, setSlotes] = useState<string[]>([])
	useEffect(() => {
		const skills = worker.Skills.split(",")
		setSkills(skills)
		const clean = worker.AvailableSlots.replace("[", "").replace("]", "")
		const list = clean.split(",")
		setSlotes(list)
	}, [worker])
	const [name, setName] = useState("")
	const [id, setId] = useState("")

	return (
		<div className="flex flex-col gap-2 p-5 bg-background rounded-xl w-full">
			<h3 className="text-lg font-semibold">Worker Details</h3>
			<Field field="Id" WorkerValue={worker.WorkerID} />
			<Field field="Name" WorkerValue={worker.WorkerName} />
			<Field field="Group" WorkerValue={worker.WorkerGroup} />
			<Skills skills={skills} setSkills={setSkills} />
			<AvlSlots slots={slotes} setSlotes={setSlotes} />
			<Field field="MaxLoad per phase" WorkerValue={worker.MaxLoadPerPhase} />
			<Field field="Qualification" WorkerValue={worker.QualificationLevel} />
			<div className="flex gap-4 justify-end">
				<Button variant={'secondary'} onClick={()=>{
					setFocus(null)
				}}>Close</Button>
				<Button>Save</Button>
			</div>
		</div>
	)
}
