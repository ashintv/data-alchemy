import { TableCell, TableRow } from "@/components/ui/table"
import { memo } from "react"
import { ClientCell } from "../cell/client-cell"
import { Button } from "@/components/ui/button"
import { DeleteIcon } from "@/components/icons/delete"
export const ClientRow = memo(({ clientId, clientName, index, requestedTaskIDs, priorityLevel }: RowsP) => {
	return (
		<>
			<TableRow key={clientId}>
				<TableCell>{clientId}</TableCell>
				<ClientCell value={clientName} name={"ClientName"} index={index} />
				<ClientCell value={String(priorityLevel)} name="PriorityLevel" index={index} />
				<ClientCell value={requestedTaskIDs} name="RequestedTaskIDs" index={index} />
				<ClientCell value={"asd"} name="GroupTag" index={3} />
				<TableCell>
					<Button>
						<DeleteIcon />
					</Button>
				</TableCell>
			</TableRow>
		</>
	)
})

interface RowsP {
	clientId: string
	clientName: string
	index: number
	requestedTaskIDs: string
	priorityLevel: number
}
