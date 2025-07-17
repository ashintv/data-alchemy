import { TableCell, TableRow } from "@/components/ui/table"
import { memo } from "react"
import { TaskCell } from "../cell/task-cell"
import { AlertDelete } from "@/components/alerts/alertdelete"
interface TaskRowI{
    TaskID:string,
    TaskName:string,
    Category:string,
    Duration:string,
    index:number,
    RequiredSkills:string
    PreferredPhases:string,
    MaxConcurrent:string

}
export const TaskRow = memo(({TaskID,TaskName,Category,Duration,RequiredSkills,index,PreferredPhases,MaxConcurrent}:TaskRowI) => {
	return (
		<TableRow key={TaskID}>
			<TaskCell name="TaskID" value={TaskID} index={index} />
			<TaskCell name="TaskName" value={TaskName} index={index} />
			<TaskCell name="Category" value={Category} index={index} />
			<TaskCell name="Duration" value={String(Duration)} index={index} />
			<TaskCell name="RequiredSkills" value={RequiredSkills} index={index} />
			<TaskCell name="PreferredPhases" value={PreferredPhases} index={index} />
			<TaskCell name="MaxConcurrent" value={String(MaxConcurrent)} index={index} />
			<TableCell className="flex , gap-5">
				<AlertDelete index={index} />
			</TableCell>
		</TableRow>
	)
})
