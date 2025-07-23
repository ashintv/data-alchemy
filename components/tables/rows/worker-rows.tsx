import { TableCell, TableRow } from "@/components/ui/table"
import { memo } from "react"
import { WorkerCell } from "../cell/worker-cell"
import { AlertDelete } from "@/components/alerts/alertdelete"
import { checkErrorsWorker } from "@/lib/validators/worker-validator"
interface Worker {
	WorkerID: string
	Skills: string
	WorkerName: string
	index: number
	AvailableSlots: string
	MaxLoadPerPhase: string
	WorkerGroup: string
	QualificationLevel: string
}
export const WorkerRow = memo(function WorkerRow({ WorkerID, Skills, WorkerName, index, AvailableSlots, MaxLoadPerPhase, WorkerGroup, QualificationLevel }: Worker) {
	const error = checkErrorsWorker({
		WorkerID,
		Skills,
		WorkerName,
		AvailableSlots,
		MaxLoadPerPhase,
		WorkerGroup,
		QualificationLevel,
	})
	return (
		<TableRow key={index}>
			<WorkerCell value={WorkerID} index={index} name="WorkerID" error={error?.WorkerID}/>
			<WorkerCell value={WorkerName} index={index} name="WorkerName" error={error?.WorkerName} />
			<WorkerCell value={Skills} index={index} name="Skills" error={error?.Skills} />
			<WorkerCell value={AvailableSlots} index={index} name="AvailableSlots" error={error?.AvailableSlots}/>
			<WorkerCell value={MaxLoadPerPhase} index={index} name="MaxLoadPerPhase" error={error?.MaxLoadPerPhase} />
			<WorkerCell value={WorkerGroup} index={index} name="WorkerGroup" error={error?.WorkerGroup} />
			<WorkerCell value={QualificationLevel} index={index} name="QualificationLevel" error={error?.QualificationLevel} />
			<TableCell className="flex , gap-5">
				<AlertDelete index={index} table="workers" />
			</TableCell>
		</TableRow>
	)
})
