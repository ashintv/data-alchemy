import { Input } from "@/components/ui/input"
import { TableCell } from "@/components/ui/table"
import { useDataStore, Worker } from "@/lib/store/data"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { memo, useState } from "react"
import { useShallow } from "zustand/react/shallow"
interface Props {
	name:string
	value: string
	error?: string
	index: number
}

export const WorkerCell =  memo(({name , value, error , index}: Props)=> {
	const setWorkers = useDataStore(useShallow(s => s.setWorkers))
	return (
		<TableCell>
			<Tooltip>
				<TooltipTrigger>
					{error && (
						<TooltipContent className="text-destructive bg-background">
							<p>{error ? error : null}</p>
						</TooltipContent>
					)}
					<Input
						className={error ? "border border-destructive" : ""}
						value={ value}
						onChange={(e) => {
							setWorkers(c => c.map((worker, i) => {
								if (index ==i) {
									return {
										...worker,
										[name]: e.target.value
									}
								} else {
									return worker
								}
							}))
						}}
					/>
				</TooltipTrigger>
			</Tooltip>
		</TableCell>
	)})


