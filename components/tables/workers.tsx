"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Client, useDataStore, Worker } from "@/lib/store/data"
import { Button } from "../ui/button"
import { useState } from "react"
import { ClientData } from "../cards/client"
import { AlertDelete } from "../alerts/alertdelete"
import UploadSection from "../ui/forms/upload"
import { WorkerEditor } from "../cards/worker"
import { WorkerCell } from "./cell/worker-cell"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Heading } from "./heading"
import { WorkerRow } from "./rows/worker-rows"
export default function WorkersTable() {
	const [focus, setFocus] = useState<Worker | null>(null)
	const { workers, setWorkers } = useDataStore()
	const [errors, setErrors] = useState<Record<string, string>>({})
	return (
		<div className="flex">
			{focus && (
				<div className=" border-primary rounded-xl w-4/6 h-screen mt-20 ">
					<WorkerEditor worker={focus} setFocus={setFocus} />
				</div>
			)}

			<div className="h-screen w-full  overflow-scroll">
				<Heading value="Workers" />
				<div className=" bg-background  border-primary  rounded-2xl ">
					<div className="p-5">
						<Table className="">
							<TableHeader className="p-15">
								<TableRow className="text-center">
									<TableHead>Worker ID</TableHead>
									<TableHead>Worker Name</TableHead>
									<TableHead>Skills</TableHead>
									<TableHead>Available Slots</TableHead>
									<TableHead>MaxLoad per phase</TableHead>
									<TableHead>Worker Group</TableHead>
									<TableHead>Qualification Level</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{workers.map((worker, index) => (
									<WorkerRow
										key={index}
										WorkerGroup={worker.WorkerGroup}
										MaxLoadPerPhase={String(worker.MaxLoadPerPhase)}
										QualificationLevel={String(worker.QualificationLevel)}
										WorkerID={worker.WorkerID}
										Skills={worker.Skills}
										WorkerName={worker.WorkerName}
										index={index}
										AvailableSlots={worker.AvailableSlots}
									/>
								))}

								{workers.length === 0 && (
									<TableRow>
										<TableCell colSpan={8} className="text-center text-muted-foreground">
											<UploadSection />
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</div>
	)
}
