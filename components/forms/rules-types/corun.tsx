import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataStore } from "@/lib/store/data";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useDebounce } from "@/hooks/useDebounce";

export function CoRun() {
	const [taskId, setTaskId] = useState<string>("");
	const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
	const taskIds = useDataStore(
		useShallow((state) => state.tasks.map((task) => task.TaskID))
	);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		if (taskId.trim() === "") return;
        let values: string[];
        if (taskId.includes("-")) {
            values = taskId.split("-").map((v) => v.trim());
        } else {
            values = taskId.split(",").map((v) => v.trim());
        }
		for (const value of values) {
			if (!taskIds.includes(value)) {
				setError(`Invalid Task ID: ${value}`);
				return;
			}
		}
		setError(null);
	}, [taskId, taskIds]);
	const AddTasks = () => {    
		if (taskId) {
			if (taskId.trim() !== "") {
				if (taskId.includes("-")) {
					const values = taskId.split("-").map((v) => v.trim());
					const start = parseInt(
						values[0][0] === "T" ? values[0].slice(1) : values[0]
					);
					const end = parseInt(
						values[1][0] === "T" ? values[1].slice(1) : values[1]
					);
					const newTaskIds: string[] = [];
					for (let i = start; i <= end; i++) {
						newTaskIds.push(`T${i}`);
					}
					setTaskId(newTaskIds.join(", "));
					if (error) return;
					setSelectedTasks((prev) => [...prev, ...newTaskIds]);
					setTaskId("");
					return;
				}
				const values = taskId.split(",").map((id) => id.trim());
				setSelectedTasks((prev) => [...prev, ...values]);
				setTaskId("");
			}
		}
	};

	return (
		<div className="w-xl">
			<h2 className="text-lg font-bold">Rule: CoRun</h2>
			<div className="flex gap-2 items-center">
				<div className="">TaskID</div>
				<Input
					value={taskId}
					className={`border border-border rounded-md p-2 w-full ${
						error ? "border-red-500" : ""
					}`}
					onChange={(e) => setTaskId(e.target.value)}
					type="text"
					placeholder="T23"
				/>

				<Button onClick={AddTasks}>Add Task</Button>
			</div>
			<Label className="text-red-500 text-xs">{error}</Label>
			<div className="flex justify-between items-center mt-4">
				<div className="flex-wrap">
					Selected Tasks: {selectedTasks.join(", ")}
				</div>
				<Button variant={"secondary"}>Add Rule</Button>
			</div>
		</div>
	);
}
