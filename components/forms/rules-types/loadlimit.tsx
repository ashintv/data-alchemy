import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { useRulesStore } from "@/lib/store/rules";
import { useShallow } from "zustand/react/shallow";
import { useDataStore } from "@/lib/store/data";

export function LoadLimit() {
	const rules = useRulesStore(useShallow((state) => state.rules));
	useEffect(() => {
		console.log("Rules:", rules);
	}, [rules]);

	const [workerGroupId, setWorkerGroupId] = useState<string>("");
	const [maxLoad, setMaxLoad] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [errors, setErrors] = useState<ErrorType | null>(null);
	const workerGroupsIds = useDataStore(
		useShallow(
			(state) => new Set(state.workers.map((worker) => worker.WorkerGroup))
		)
	);
	useEffect(() => {
		console.log("Worker Group IDs:", workerGroupsIds);
		if (workerGroupId && !workerGroupsIds.has(workerGroupId)) {
			setErrors((prev) => ({ ...prev, workerGroupId: "Invalid Worker Group" }));
		} else {
			setErrors((prev) => ({ ...prev, workerGroupId: undefined }));
		}
	}, [workerGroupId, workerGroupsIds]);

	const addRules = useRulesStore(useShallow((state) => state.addRule));

	const handleSubmit = () => {
		const newErrors: ErrorType = {};

		if (!workerGroupId.trim()) {
			newErrors.workerGroupId = "Worker Group is required";
		} else if (!workerGroupsIds.has(workerGroupId)) {
			newErrors.workerGroupId = "Invalid Worker Group";
		}

		if (!maxLoad.trim()) {
			newErrors.maxLoad = "Max Load is required";
		} else {
			const parsedMaxLoad = parseInt(maxLoad, 10);
			if (isNaN(parsedMaxLoad) || parsedMaxLoad <= 0) {
				newErrors.maxLoad = "Max Load must be a positive number";
			}
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		addRules({
			id: `rule-${Date.now()}`,
			name: name || `Load Limit Rule ${Date.now()}`,
			workerGroupId,
			type: "loadLimit",
			maxSlotsPerPhase: parseInt(maxLoad, 10),
		});

		setWorkerGroupId("");
		setMaxLoad("");
		setName("");
		setErrors(null);
	};

	return (
		<div className="w-xl flex flex-col gap-4">
			<h2>Load Limit Rule</h2>
			<InputBox
				value={name}
				setValue={setName}
				placeholder={`Rule Name (optional) default: Load Limit Rule }`}
				label="Rule Name"
			/>
			<InputBox
				value={workerGroupId}
				setValue={setWorkerGroupId}
				placeholder="Enter Worker Group"
				label="Worker Group"
				error={errors?.workerGroupId}
			/>

			<p>Set the maximum load limit for this WorkerGroup.</p>
			<InputBox
				value={maxLoad}
				setValue={setMaxLoad}
				placeholder="Enter Max Load"
				label="Max Load"
				error={errors?.maxLoad}
			/>
			<Button variant={"secondary"} onClick={handleSubmit}>
				Submit
			</Button>
		</div>
	);
}
interface ErrorType {
	workerGroupId?: string;
	maxLoad?: string;
	name?: string;
}
