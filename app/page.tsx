"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useDataStore } from "@/lib/store/data"
import axios from "axios"
import { redirect } from "next/navigation"
import { useState } from "react"
import { set } from "zod"
export default function Main() {
	const setWorkers = useDataStore((state) => state.setWorkers)
	const setTasks = useDataStore((state) => state.setTasks)
	const setClients = useDataStore((state) => state.setClients)
	const [loading , setloading]=useState(false)
	async function loadSample() {
		setloading(true)
		const res =await axios.get('https://data-alchemy-uebe.vercel.app//api/sample')
		console.log(res.data)
		if (!res.data) {
			alert("Failed to load sample data. Please try again later.")
			return
		}
		setWorkers(() => res.data.data.workers)
		setTasks(() => res.data.data.tasks)
		setClients(() => res.data.data.clients)
		setloading(false)
		redirect("/dashboard")
	}
	return (
		<div className="overflow-scroll w-screen h-screen">
			<div className="flex flex-col h-full bg-background text-foreground px-6 py-12">
				<section className="flex flex-col items-center mb-12">
					<h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-center">
						Data Alchemy
					</h1>

					<p className="text-lg md:text-xl mb-10 text-center max-w-2xl text-muted-foreground">
						Manage your org intelligently. Try our sample or upload your own CSVs to start an alchemy session.
					</p>

					<div className="flex gap-4 text-background">
						<Button variant="default" size="lg" onClick={loadSample} disabled={loading}>
							{loading?'loading...':"Try our Sample"}
						</Button>
						<Button
							variant="secondary"
							size="lg"
							onClick={() => {
								redirect("/dashboard")
							}}>
							Upload Your Data
						</Button>
					</div>
				</section>
				<section className="w-full max-w-5xl mx-auto space-y-8">
					<h2 className="text-3xl font-bold ">📁 Supported CSV Schemas</h2>

					<Card>
						<CardContent className="p-4">
							<h3 className="text-2xl font-semibold mb-2">✅ clients.csv</h3>
							<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
								{"ClientID, ClientName, PriorityLevel, RequestedTaskIDs, GroupTag, AttributesJSON"}
								<br />
								{"PriorityLevel: integer (1–5)"}
								<br />
								{"RequestedTaskIDs: comma-separated TaskIDs (e.g. T1,T2)"}
								<br />
								{'AttributesJSON: arbitrary JSON metadata (e.g. {"region":"EU"})'}
							</pre>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-4">
							<h3 className="text-2xl font-semibold mb-2">✅ workers.csv</h3>
							<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
								{"WorkerID, WorkerName, Skills, AvailableSlots, MaxLoadPerPhase, WorkerGroup, QualificationLevel"}
								<br />
								{"Skills: comma-separated tags (e.g. coding,design)"}
								<br />
								{"AvailableSlots: array of phase numbers (e.g. [1,3,5])"}
								<br />
								{"MaxLoadPerPhase: integer"}
							</pre>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-4">
							<h3 className="text-2xl font-semibold mb-2">✅ tasks.csv</h3>
							<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
								{"TaskID, TaskName, Category, Duration, RequiredSkills, PreferredPhases, MaxConcurrent"}
								<br />
								{"Duration: number of phases (≥1)"}
								<br />
								{"RequiredSkills: comma-separated tags (e.g. coding,ml)"}
								<br />
								{"PreferredPhases: list or range (e.g. '1-3' or [2,4,5])"}
								<br />
								{"MaxConcurrent: integer"}
							</pre>
						</CardContent>
					</Card>
					<div className="text-center text-xl font-extrabold font-serif">Want to use your own sample data</div>
					<Card className="border-0">
						<CardContent className="p-4">
							<pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
								✅ To use your sample data replace the sample data provided in the source code with your data
								<br /><br />
								⚠️ Ensure the names of files provided is  workers.csv , tasks.csv , clients.csv
								<br /><br />

								💡 To avoid errors ensure your sample data will follow the schema 
							</pre>
						</CardContent>
					</Card>
				</section>

				<footer className="mt-20 text-muted-foreground text-sm text-center">© 2025 Data Alchemy — Transform Your Workflows</footer>
			</div>
		</div>
	)
}
