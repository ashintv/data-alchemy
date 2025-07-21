import { useDataStore } from "@/lib/store/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { TaskCell } from "./cell/task-cell"
import UploadSection from "../ui/forms/upload"
import { Heading } from "./heading"
import { AlertDelete } from "../alerts/alertdelete"
import { TaskRow } from "./rows/task-row"

export function TasksTable() {
	const tasks = useDataStore((s) => s.tasks)
	// const tasks = full_tasks.filter((task) => task.TaskID !== )
	const setTasks = useDataStore((s) => s.setTasks)
	return (
		<div className="flex">
			<div className="h-screen w-full  overflow-scroll">
				<Heading value="Tasks" />
				<div className=" bg-background  border-primary  rounded-2xl ">
					<div className="p-5">
						<Table className="">
							<TableHeader className="p-15">
								<TableRow>
									<TableHead>Task ID</TableHead>
									<TableHead>Task Name</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Duration</TableHead>
									<TableHead>Required Skills</TableHead>
									<TableHead>Preferred Phases</TableHead>
									<TableHead>Max Concurrent</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tasks.map((task, index) => (
									<TaskRow
										key={index}
										index={index}
										TaskID={task.TaskID}
										TaskName={task.TaskName}
										Category={task.Category}
										Duration={String(task.Duration)}
										RequiredSkills={task.RequiredSkills}
										PreferredPhases={task.PreferredPhases}
										MaxConcurrent={String(task.MaxConcurrent)}
									/>
								))}

								{tasks.length === 0 && (
									<TableRow>
										<TableCell colSpan={7} className="text-center text-muted-foreground">
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
