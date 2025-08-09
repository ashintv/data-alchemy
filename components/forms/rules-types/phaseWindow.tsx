import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDataStore } from "@/lib/store/data"
import { useState } from "react";
import { useShallow } from "zustand/react/shallow"

export function PhaseWindow() {
    const task = useDataStore(useShallow(x => x.tasks.map(task => task.TaskID)))
    const [selectedTask, setSelectedTask] = useState<string>("");
    const [phaseWindow, setPhaseWindow] = useState<string>("");
	return (
		<div className="w-xl flex flex-col gap-4">
			<h2>Phase Window Rule</h2>
            <div className="flex items-center">
				<Label className="mr-2">Select Task:</Label>
				<select className="border border-black rounded-md p-2 w-full px-5" value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
					{task.map(taskID => (
						<option key={taskID} value={taskID}>
							{taskID}
						</option>
					))}
				</select>
			</div> 
            <div className="flex items-center">
                <Label className="mr-2">Enter Phase Window Start Time:</Label>
                <Input
                    value={phaseWindow}
                    onChange={(e) => setPhaseWindow(e.target.value)}
                    className="border border-black rounded-md p-2 w-full"
                />
            </div>
            <Button variant={'secondary'} onClick={() => console.log({ selectedTask, phaseWindow })}>Submit</Button>
		</div>
	);
}
