"use client"

import { Rules } from "@/components/forms/rules"
import ClientsTable from "@/components/tables/client"
import { DownloadCSV } from "@/components/tables/download"
import { TasksTable } from "@/components/tables/task"
import WorkersTable from "@/components/tables/workers"
import { Button } from "@/components/ui/button"
import {  useRuleForm, useSidebar } from "@/lib/store/data"

const Dashboard = function Dashboard() {
	const { currentTab, setCurrentTab } = useSidebar()
	const visible = useRuleForm(c => c.visible)
	return (
		<div className="relative">
			<div className="bg-background w-full ">
				<div className="h-full   overflow-scroll px-15">

					{currentTab === "clients" && <ClientsTable />}
					{currentTab === "workers" && <WorkersTable />}
					{currentTab === "tasks" && <TasksTable />}

				</div>
				<div className="absolute  bg-transparent flex  justify-center top-0 w-full ">
					<div className="flex  justify-center  backdrop-blur items-center w-full  h-10    ">
						<div className="flex gap-2  font-extrabold font-mono ">
							<Button
								onClick={() => setCurrentTab("clients")}
								variant={"link"}
								className={`"font-extrabold hover:text-destructive text-md" ${currentTab == "clients" ? "text-destructive" : "text-foreground"}`}>
								Clients
							</Button>
							<Button
								onClick={() => setCurrentTab("workers")}
								variant={"link"}
								className={`"font-extrabold hover:text-destructive text-md" ${currentTab == "workers" ? "text-destructive" : "text-foreground"}`}>
								Workers
							</Button>
							<Button
								onClick={() => setCurrentTab("tasks")}
								variant={"link"}
								className={`"font-extrabold hover:text-destructive text-md" ${currentTab == "tasks" ? "text-destructive" : "text-foreground"}`}>
								Tasks
							</Button>
							<DownloadCSV />
						</div>
					</div>

				</div>
			</div>
			{visible && <Rules />}
			
		</div>


	)
}
export default Dashboard
