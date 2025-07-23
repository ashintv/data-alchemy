import { TableCell, TableRow } from "@/components/ui/table"
import { memo } from "react"
import { ClientCell } from "../cell/client-cell"
import { checkErrors } from "@/lib/validators/cliient-validator"
import { AlertDelete } from "@/components/alerts/alertdelete"
export const ClientRow = memo(function ClientRow({ ClientID, ClientName, index, RequestedTaskIDs, PriorityLevel, GroupTag, tasks, AttributesJSON }: RowsP) {
	const error = checkErrors({
		ClientID,
		ClientName,
		RequestedTaskIDs,
		PriorityLevel,
		GroupTag,
		AttributesJSON
	}, tasks)
	return (
		<>
			<TableRow key={ClientID} >

				<ClientCell value={ClientID} name={"ClientID"} index={index} error={error?.ClientID} />
				<ClientCell value={ClientName} name={"ClientName"} index={index} error={error?.ClientName} />
				<ClientCell value={PriorityLevel} name="PriorityLevel" index={index} error={error?.PriorityLevel} />
				<ClientCell value={RequestedTaskIDs} name="RequestedTaskIDs" index={index} error={error?.RequestedTaskIDs} />
				<ClientCell value={GroupTag} name="GroupTag" index={index} error={error?.GroupTag} />
				<ClientCell value={AttributesJSON} name="GroupTag" index={index} error={error?.AttributesJSON} />
				<TableCell>
					<AlertDelete index={index} table="clients"/>
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
	GroupTag: string,
	AttributesJSON: string
	tasks: string[]
}
