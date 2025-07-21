"use client"

import { Logo } from "@/components/icons/dataalchemist"
import { Rules } from "@/components/forms/rules"
import ClientsTable from "@/components/tables/client"
import { DownloadCSV } from "@/components/tables/download"
import { TasksTable } from "@/components/tables/task"
import WorkersTable from "@/components/tables/workers"
import { Button } from "@/components/ui/button"
import { useDataStore, useRuleForm, useSidebar } from "@/lib/store/data"
import { useEffect, useState } from "react"
import { memo } from "react"
const Dashboard = function Dashboard() {
	const { currentTab, setCurrentTab } = useSidebar()
	const visible = useRuleForm(c => c.visible)
	return (
		<>
			<div className="bg-primary/5 w-full ">
				<div className=" h-full   overflow-scroll px-15 ">

					{currentTab === "clients" && <ClientsTable />}
					{currentTab === "workers" && <WorkersTable />}
					{currentTab === "tasks" && <TasksTable />}

				</div>
				<div className="fixed flex bg-transparent justify-center top-5 w-full px-5 p-2 ">
					<div className="flex  justify-center  bg-primary/2 items-center border border-primary/2 mx-10 h-10 px-20 rounded-full backdrop-blur-md  ">
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
			
		</>


	)
}
export default Dashboard
