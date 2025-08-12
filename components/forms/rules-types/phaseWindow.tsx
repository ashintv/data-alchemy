import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDataStore } from "@/lib/store/data";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { InputBox } from "./InputBox";
import { useRulesStore } from "@/lib/store/rules";

export function PhaseWindow() {
	const taskIDs = useDataStore(
		useShallow((x) => x.tasks.map((task) => task.TaskID))
	);
	const [name, setName] = useState<string>("");
	const [error, setError] = useState<ErrorType | null>(null);
	const [selectedTask, setSelectedTask] = useState<string>("");
	const [phaseWindow, setPhaseWindow] = useState<string>("");
	const [selectedPhases, setSelectedPhases] = useState<string[]>([]);
	const addRules = useRulesStore(useShallow((state) => state.addRule));

	function parsePhaseWindow(input: string): string[] {
		if (input.includes("-")) {
			const [start, end] = input.split("-").map(Number);
			if (isNaN(start) || isNaN(end) || start > end) {
				setError((prev) => ({ ...prev, phaseWindow: "Invalid phase window format" }));
				return [];
			}
			return Array.from({ length: end - start + 1 }, (_, i) =>
				(start + i).toString()
			);
		}
		return input
			.split(",")
			.map((num) => num.trim())
			.filter((n) => n !== "");
	}

	function handleAddPhase() {
		const phases = parsePhaseWindow(phaseWindow);
		if (phases.length === 0) {
			setError((prev) => ({ ...prev, phaseWindow: "Invalid phase format" }));
			return;
		}
		setSelectedPhases((prev) => Array.from(new Set([...prev, ...phases])));
		setPhaseWindow(""); 
		setError(null);
	}

	return (
		<div className="w-xl flex flex-col gap-4">
			<h2>Phase Window Rule</h2>
			<InputBox
				value={name}
				setValue={setName}
				placeholder={`Phase Window Rule ${Date.now()}`}
				label="Name"
			/>

			<div className="flex gap-2">
				<div className="flex items-center gap-2">
					<Label>Select Task:</Label>
					<select
						className="border border-black rounded-md p-2 w-full px-5"
						value={selectedTask}
						onChange={(e) => setSelectedTask(e.target.value)}>
						<option value="">-- Select Task --</option>
						{taskIDs.map((taskID) => (
							<option key={taskID} value={taskID}>
								{taskID}
							</option>
						))}
					</select>
				</div>

				<div className="flex gap-1">
					<InputBox
						value={phaseWindow}
						setValue={setPhaseWindow}
						error={error?.phaseWindow}
						placeholder={`1-7 or 1,2,3`}
						label="Phase Window"
					/>
					<Button onClick={handleAddPhase}>Add Phase</Button>
				</div>
			</div>

			<div className="flex-wrap bg-primary rounded-xl p-4 w-full">
				Selected Phases: {selectedPhases.join(", ")}
			</div>

			<Button
				variant="secondary"
				onClick={() => {
					if (error) return;
					addRules({
						id: Date.now().toString(),
						name: name || `Phase Window Rule ${Date.now()}`,
						type: "phaseWindow",
						taskId: selectedTask,
						allowedPhases: selectedPhases,
					});
				}}>
				Submit
			</Button>
		</div>
	);
}

interface ErrorType {
	phaseWindow?: string;
}
