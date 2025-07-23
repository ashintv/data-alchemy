"use client";

import { Client, Task, useDataStore, Worker } from "@/lib/store/data";
import Papa from "papaparse";
import { useRouter } from "next/navigation";
import { Input } from "../input";
import { Button } from "../button";
import { useState } from "react";
import { file, set } from "zod";

export default function UploadSection() {
	const [clients_, setClients_] = useState<Client[]>([])
	const [workers_, setWorkers_] = useState<Worker[]>([])
	const [tasks_, setTasks_] = useState<Task[]>([])
	const [clientsUploaded, setClientsUploaded] = useState(false);
	const [workersUploaded, setWorkersUploaded] = useState(false);
	const [tasksUploaded, setTasksUploaded] = useState(false);
	const { clients, workers, tasks } = useDataStore();
	const { setClients, setWorkers, setTasks } = useDataStore();
	const [clientsError, setClientsError] = useState(false);
	const [workersError, setWorkersError] = useState(false);
	const [tasksError, setTasksError] = useState(false);
	const router = useRouter();

	const handleClients = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (result) => {
				const data = result.data
				const expectedHeaders = ["ClientID", "ClientName", "PriorityLevel", "RequestedTaskIDs", "GroupTag", "AttributesJSON"];
				const actualHeaders = Object.keys(data[0] || {});
				const isValid =
					expectedHeaders.every(h => actualHeaders.includes(h)) &&
					actualHeaders.every(h => expectedHeaders.includes(h));
				if (!isValid) {
					alert("Invalid CSV format for Clients. Please check the headers.");
					setClientsError(true);
					return;
				}
				setClientsError(false);
				setClients_(() => data as Client[]);
				setClientsUploaded(true);

			},
		});
	};

	const handleWorkers = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (result) => {

				const data = result.data;
				const expectedHeaders = ["WorkerID", "WorkerName", "Skills", "AvailableSlots", "MaxLoadPerPhase", "WorkerGroup", "QualificationLevel"];
				const actualHeaders = Object.keys(data[0] || {});
				const isValid =
					expectedHeaders.every(h => actualHeaders.includes(h)) &&
					actualHeaders.every(h => expectedHeaders.includes(h));
				if (!isValid) {
					alert("Invalid CSV format for Workers. Please check the headers.");
					setWorkersError(true);
					return;
				}
				setWorkersError(false);
				setWorkers_(() => data as Worker[]);
				setWorkersUploaded(true);
			},
		});
	};

	const handleTasks = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (result) => {
				const data = result.data;
				const expectedHeaders = ["TaskID", "TaskName", "Category", "Duration", "RequiredSkills", "PreferredPhases", "MaxConcurrent"];
				const actualHeaders = Object.keys(data[0] || {});
				const isValid =
					expectedHeaders.every(h => actualHeaders.includes(h)) &&
					actualHeaders.every(h => expectedHeaders.includes(h));
				if (!isValid) {
					alert("Invalid CSV format for Tasks. Please check the headers.");
					setTasksError(true);
					return;
				}
				setTasksError(false);
				setTasks_(() => data as Task[]);
				setTasksUploaded(true);
			},
		});
	};

	function putData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault(); // ✅ Prevent page reload
		if (clients_.length === 0 || workers_.length === 0 || tasks_.length === 0) {
			alert("Please upload all files before submitting.");
			return;
		}
		setClients(() => clients_);
		setWorkers(() => workers_);
		setTasks(() => tasks_);
		console.log("Data uploaded successfully");
		router.push("/dashboard"); // ✅ Client-side redirect
	}

	return (
		<div className="w-full h-full flex items-center justify-center">

			<form
				onSubmit={putData}
				className="flex flex-col  w-full gap-4 p-6 rounded text-foreground"
			>
				<div>
					<label className="block font-bold text-foreground mb-2">Upload Clients CSV</label>
				</div>
				<div className="flex items-center gap-5">

					<Input
						type="file"
						accept=".csv"
						onChange={handleClients}
						placeholder="Upload Clients CSV"
						className={`border rounded px-3 py-2 ${clientsError ? "border-red-500 bg-red-50" : "border-gray-300"}`}
						required
					/>
					<label className="block font-bold text-foreground">
						{clientsUploaded && <span className="text-green-500">✅</span>}
					</label>
				</div>
				<div>
					<label className="block font-bold text-foreground mb-2">Upload Workers CSV</label>
				</div>
				<div className="flex items-center gap-5">

					<Input
						type="file"
						accept=".csv"
						onChange={handleWorkers}
						placeholder="Upload Workers CSV"
						className={`border rounded px-3 py-2 ${workersError ? "border-red-500 bg-red-50" : "border-gray-300"}`}
						required
					/>
					<label className="block font-bold text-foreground">
						{workersUploaded && <span className="text-green-500">✅</span>}
					</label>
				</div>
				<div>
					<label className="block font-bold text-foreground mb-2">Upload Tasks CSV</label>
				</div>
				<div className="flex items-center gap-5">

					<Input
						type="file"
						accept=".csv"
						onChange={handleTasks}
						placeholder="Upload Tasks CSV"
						className={`border rounded px-3 py-2 ${tasksError ? "border-red-500 bg-red-50" : "border-gray-300"}`}
						required
					/>
					<label className="block font-bold text-foreground">
						{tasksUploaded && <span className="text-green-500">✅</span>}
					</label>
				</div>
				<Button
					type="submit"
					className="mt-6"
					disabled={!(clientsUploaded && workersUploaded && tasksUploaded)}
				>
					Submit
				</Button>
			</form>
		</div>
	);
}