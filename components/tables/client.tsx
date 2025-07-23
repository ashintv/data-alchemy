"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {  useDataStore } from "@/lib/store/data"
import UploadSection from "../ui/forms/upload"
import { Heading } from "./heading"
import { useShallow } from "zustand/react/shallow"
import { ClientRow } from "./rows/client-rows"

export default function ClientTable() {
	const clients  = useDataStore(useShallow((s) => s.clients))
	const tasks = useDataStore(useShallow((s)=>s.tasks.map(x=>x.TaskID)))
	return (
		<div className="h-screen w-full overflow-scroll  shadow-primary shadow-2xs py-16 ">
			<Heading value="Clients" />
			<div className="  p-5  rounded-2xl ">
				<div className="w-full overflow-x-scroll "> 
					<Table className="">
						<TableHeader className="">
							<TableRow>
								<TableHead>ClientID</TableHead>
								<TableHead>ClientName</TableHead>
								<TableHead>PriorityLevel</TableHead>
								<TableHead>RequestedTaskIDs</TableHead>
								<TableHead>GroupTag</TableHead>
								<TableHead>AttributesJSON</TableHead>
								<TableHead>Actions</TableHead>
								
							</TableRow>
						</TableHeader>
						<TableBody>
							{clients.map((client, index) => (
									<ClientRow
										key={index}
										ClientID={client.ClientID}
										ClientName={client.ClientName}
										index={index}
										RequestedTaskIDs={client.RequestedTaskIDs}
										PriorityLevel={client.PriorityLevel}
										GroupTag={client.GroupTag}
										AttributesJSON = {client.AttributesJSON}
										tasks={tasks}
									/>
								
							))}
							{clients.length === 0 && (
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
	)
}
