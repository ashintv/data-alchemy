import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-select";
import { useState } from "react";

export function CoRun() {
    const [taskId, setTaskId] = useState<string>("");
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

	return (
		<div className="w-xl">
			<h2 className="text-lg font-bold">Rule: CoRun</h2>
			<div className="flex gap-2 items-center">
				<div className="">TaskID</div>
				<Input
					value={taskId}
					className="border border-border rounded-md p-2 w-full"
					onChange={(e) => setTaskId(e.target.value)}
					type="text"
					placeholder="T23"
				/>
				<Button
					onClick={() => {
						if (taskId) {
							if (taskId.trim() !== "") {
                                const values = taskId.split(",").map((id) => id.trim());
								setSelectedTasks((prev) => [...prev, ...values]);
								setTaskId("");
							}
						}
					}}>
					Add Task
				</Button>
			</div>
			<div className="flex justify-between items-center mt-4">
				<div className="flex-wrap">Selected Tasks: {selectedTasks.join(", ")}</div>
                <Button variant={"secondary"}>Add Rule</Button>
			</div>
		</div>
	);
}
