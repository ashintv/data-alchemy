import { TableCell, TableRow } from "@/components/ui/table"
import { memo } from "react"
import { WorkerCell } from "../cell/worker-cell"
import { AlertDelete } from "@/components/alerts/alertdelete"
interface Worker{
    WorkerID:string,
    Skills:string,
    WorkerName:string,
    index:number,
    AvailableSlots:string,
    MaxLoadPerPhase:string,
    WorkerGroup:string
    QualificationLevel:string
}
export const WorkerRow = memo(({ WorkerID, Skills, WorkerName, index, AvailableSlots, MaxLoadPerPhase, WorkerGroup, QualificationLevel }:Worker) => {
	return (
		<TableRow key={index}>
			<WorkerCell value={WorkerID} index={index} name="WorkerID" />
			<WorkerCell value={WorkerName} index={index} name="WorkerName" />
			<WorkerCell value={Skills} index={index} name="Skills" />
			<WorkerCell value={AvailableSlots} index={index} name="AvailableSlots" />
			<WorkerCell value={String(MaxLoadPerPhase)} index={index} name="MaxLoadPerPhase" />
			<WorkerCell value={WorkerGroup} index={index} name="WorkerGroup" />
			<WorkerCell value={String(QualificationLevel)} index={index} name="QualificationLevel" />
			<TableCell className="flex , gap-5">
				<AlertDelete index={index} />
			</TableCell>
		</TableRow>
	)
})
