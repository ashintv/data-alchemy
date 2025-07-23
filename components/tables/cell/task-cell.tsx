import { Input } from "@/components/ui/input"
import { TableCell } from "@/components/ui/table"
import {  useDataStore } from "@/lib/store/data"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useShallow } from "zustand/react/shallow"
import { memo } from "react"
interface ClientCellI {
	name: string
	value: string
	error?: string
	index: number
}
export const TaskCell =memo(function TaskCell({ value, error, index, name }: ClientCellI){
	const hasError = !!error
	const setTasks = useDataStore(useShallow((s) => s.setTasks))
	return (
		<TableCell>
			<Tooltip>
				<TooltipTrigger>
					{hasError && (
						<TooltipContent className="text-destructive bg-background">
							<p>{error ? error : null}</p>
						</TooltipContent>
					)}
					<Input
						className={hasError ? "border-b border-destructive" : ""}
						value={value}
						onChange={(e) => {
							setTasks((c) =>
								c.map((task, i) => {
									if (index == i) {
										return {
											...task,
											[name]: e.target.value,
										}
									} else {
										return task
									}
								})
							)
						}}
					/>
				</TooltipTrigger>
			</Tooltip>
		</TableCell>
	)
})
