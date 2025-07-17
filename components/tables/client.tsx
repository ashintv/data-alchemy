"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Client, useDataStore } from "@/lib/store/data"
import UploadSection from "../ui/forms/upload"
import { Heading } from "./heading"
import { useShallow } from "zustand/react/shallow"
import { ClientRow } from "./rows/client-rows"
import { ClientData } from "../cards/client"


export default function ClientTable() {
	const { clients, setClients, tasks } = useDataStore(useShallow((s) => s))
	return (
		<div className="h-screen overflow-scroll  ">
			<Heading value="Clients" />
			<div className="bg-background  p-5  rounded-2xl ">
				<div className="w-full overflow-x-auto ">
					<Table className="">
						<TableHeader className="p-15">
							<TableRow>
								<TableHead>ClientID</TableHead>
								<TableHead>ClientName</TableHead>
								<TableHead>PriorityLevel</TableHead>
								<TableHead>RequestedTaskIDs</TableHead>
								<TableHead>GroupTag</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{clients.map((client, index) => (
							
									<ClientRow
										key={index}
										clientId={client.ClientID}
										clientName={client.ClientName}
										index={index}
										requestedTaskIDs={client.RequestedTaskIDs}
										priorityLevel={client.PriorityLevel}
									/>
								
								
							))}
							{clients.length === 0 && (
								<TableRow>
									<TableCell colSpan={6} className="text-center text-muted-foreground">
										<UploadSection />
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}
