import { TableCell, TableRow } from "@/components/ui/table"
import { memo } from "react"
import { TaskCell } from "../cell/task-cell"
import { AlertDelete } from "@/components/alerts/alertdelete"
import { checkErrorsTask } from "@/lib/validators/tasks-validator"
interface TaskRowI {
	TaskID: string
	TaskName: string
	Category: string
	Duration: string
	index: number
	RequiredSkills: string
	PreferredPhases: string
	MaxConcurrent: string
	WorkerSkills:string []
}
export const TaskRow = memo(function TaskRow({ TaskID, TaskName, WorkerSkills, Category, Duration, RequiredSkills, index, PreferredPhases, MaxConcurrent }: TaskRowI) {
	const errors = checkErrorsTask({
		TaskID,
		TaskName,
		Category,
		Duration,
		RequiredSkills,
		PreferredPhases,
		MaxConcurrent:MaxConcurrent,
		
	},WorkerSkills)
	return (
		<TableRow key={TaskID}>
			<TaskCell name="TaskID" value={TaskID} index={index} error={errors?.TaskID} />
			<TaskCell name="TaskName" value={TaskName} index={index} error={errors?.TaskName} />
			<TaskCell name="Category" value={Category} index={index} error={errors?.Category} />
			<TaskCell name="Duration" value={Duration} index={index} error={errors?.Duration} />
			<TaskCell name="RequiredSkills" value={RequiredSkills} index={index} error={errors?.RequiredSkills} />
			<TaskCell name="PreferredPhases" value={PreferredPhases} index={index} error={errors?.PreferredPhases} />
			<TaskCell name="MaxConcurrent" value={MaxConcurrent} index={index} error={errors?.MaxConcurrent} />
			<TableCell className="flex , gap-5">
				<AlertDelete  />
			</TableCell>
		</TableRow>
	)
})
