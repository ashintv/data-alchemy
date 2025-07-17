import { Input } from "@/components/ui/input"
import { TableCell } from "@/components/ui/table"
import { useClientUpdate } from "@/hooks/useUpdateClient"
import { Client, useDataStore } from "@/lib/store/data"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { memo, useEffect, useState } from "react"
import { useShallow } from "zustand/react/shallow"

export const ClientCell = memo(function ClientCell({ value, error, index, name }: ClientCellI) {
	const hasError = !!error
	const setClients = useDataStore(useShallow((s) => s.setClients))
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
						className={hasError ? "border border-destructive" : ""}
						value={value}
						onChange={(e) => {
							setClients((c) =>
								c.map((client, i) => {
									if (index == i) {
										return {
											...client,
											[name]: e.target.value,
										}
									} else {
										return client
									}
								})
							)
						}}
					/>
					{name == "PriorityLevel" && !hasError && (
						<div className="mt-1">
							<Progress value={(parseInt(value) / 5) * 100} />
						</div>
					)}
				</TooltipTrigger>
			</Tooltip>
		</TableCell>
	)
})

interface ClientCellI {
	value: string
	error?: string
	name: string
	index: number
}
