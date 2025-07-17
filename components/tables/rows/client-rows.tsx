import { TableCell, TableRow } from "@/components/ui/table"
import { memo, useEffect } from "react"
import { ClientCell } from "../cell/client-cell"
import { Button } from "@/components/ui/button"
import { DeleteIcon } from "@/components/icons/delete"

import { checkErrors } from "@/lib/validators/cliient-validator"
export const ClientRow = memo(({ ClientID, ClientName, index, RequestedTaskIDs, PriorityLevel  ,GroupTag}: RowsP) => {
	const error = checkErrors({
		ClientID,
		ClientName,
		RequestedTaskIDs,
		PriorityLevel,
		GroupTag
	})
	return (
		<>
			<TableRow key={ClientID}>
				<TableCell>{ClientID}</TableCell>
				<ClientCell value={ClientName} name={"ClientName"} index={index} error={error?.ClientName}/>
				<ClientCell value={PriorityLevel} name="PriorityLevel" index={index} error={error?.PriorityLevel} />
				<ClientCell value={RequestedTaskIDs} name="RequestedTaskIDs" index={index}  error={error?.RequestedTaskIDs}/>
				<ClientCell value={GroupTag} name="GroupTag" index={index} error={error?.GroupTag} />
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
	ClientID: string
	ClientName: string
	index: number
	RequestedTaskIDs: string
	PriorityLevel: string,
	GroupTag:string
}
