import { Button } from "@/components/ui/button";
import { useDataStore } from "@/lib/store/data";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useRulesStore } from "@/lib/store/rules";
import { InputBox } from "./InputBox";

export function CoRun() {
	const [name, setName] = useState<string>("");
	const [taskId, setTaskId] = useState<string>("");
	const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
	const taskIds = useDataStore(
		useShallow((state) => state.tasks.map((task) => task.TaskID))
	);

	const addRules = useRulesStore(useShallow((state) => state.addRule));
	const [error, setError] = useState<ErrorType | null>(null);
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
				if (!error) {
					setError((prev) => ({
						...prev,
						task: `Invalid Task ID: ${value}`,
					}));
				}
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
					setSelectedTasks((prev) => {
						const newTasks = newTaskIds.filter((id) => !prev.includes(id));
						return [...prev, ...newTasks];
					});
					setTaskId("");
					return;
				}
				const values = taskId.split(",").map((id) => id.trim());
				setSelectedTasks((prev) => {
					const newTasks = values.filter((id) => !prev.includes(id));
					console.log("New Tasks:", newTasks);
					console.log("Previous Tasks:", prev);
					return [...prev, ...newTasks];
				});
				setTaskId("");
			}
		}
	};

	return (
		<div className="w-xl flex flex-col gap-4">
			<h2 className="text-lg font-bold">Rule: CoRun</h2>

			<InputBox
				value={name || `CoRun Rule ${Date.now()}`}
				setValue={setName}
				error={error?.name}
				placeholder="Enter rule name"
				label="Name"
			/>
			<div className="flex gap-2 items-center justify-between">
				<InputBox
					value={taskId}
					setValue={setTaskId}
					error={error?.task}
					placeholder="Enter Task ID"
					label="TaskID"
				/>
				<Button onClick={AddTasks}>Add Task</Button>
			</div>

			<div className="flex justify-between items-center mt-4 gap-2">
				<div className="flex-wrap bg-primary rounded-xl p-4 w-full">
					Selected Tasks: {selectedTasks.join(", ")}
				</div>
				<Button
					variant={"secondary"}
					className="text-primary h-full rounded-2xl"
					onClick={() => {
						if (name.trim() === "") {
							setError({ name: "Name is required" });
							return;
						}
						if (error) return;
						addRules({
							id: `rule-${Date.now()}`,
							name,
							type: "coRun",
							tasks: selectedTasks,
						});
						setSelectedTasks([]);
					}}>
					Add Rule
				</Button>
			</div>
		</div>
	);
}

interface ErrorType {
	task?: string;
	name?: string;
}
