"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDataStore } from "@/lib/store/data"
import { AlertDelete } from "../alerts/alertdelete"
import UploadSection from "../ui/forms/upload"
import { Heading } from "./heading"
import { WorkerRow } from "./rows/worker-rows"
import { useShallow } from "zustand/react/shallow"
export default function WorkersTable() {
	const workers = useDataStore(useShallow((s) => s.workers))
	return (
		<div className="flex">
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
