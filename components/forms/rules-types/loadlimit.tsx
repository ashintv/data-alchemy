import { Button } from "@/components/ui/button";
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

	const [workerGroupId, setWorkerGroupId] = useState<string | null>(null);
	const [maxLoad, setMaxLoad] = useState<string>('');
	const [name, setName] = useState('');
	const [errors, setErrors] = useState<ErrorType | null>(null);

	const workerGroupsIds = useDataStore(
		useShallow(
			(state) => new Set(state.workers.map((worker) => worker.WorkerGroup))
		)
	);
	const addRules = useRulesStore(useShallow((state) => state.addRule));
	const handleSubmit = () => {
		const newErrors: ErrorType = {};

		if (!workerGroupId) {
			newErrors.workerGroupId = "Worker Group is required";
			return
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
			workerGroupId: workerGroupId,
			type: "loadLimit",
			maxSlotsPerPhase: parseInt(maxLoad, 10),
		});

		// reset state
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
				placeholder={`Rule Name (optional)`}
				label="Rule Name"
			/>

			<div className="flex items-center gap-2">
				<Label>Select WorkerGroup:</Label>
				<select
					className="border border-black rounded-md p-2 w-full px-5"
					value={workerGroupId || ''}
					onChange={(e) => setWorkerGroupId(e.target.value)}>
					<option value="">-- Select WorkerGroup --</option>
					{Array.from(workerGroupsIds).length > 0 ? (
						Array.from(workerGroupsIds).map((groupId) => (
							<option key={groupId} value={groupId}>
								{groupId}
							</option>
						))
					) : (
						<option disabled>No worker groups available</option>
					)}
				</select>
				{errors?.workerGroupId && (
					<p className="text-red-500">{errors.workerGroupId}</p>
				)}
			</div>

			<p>Set the maximum load limit for this WorkerGroup.</p>
			<InputBox
				value={maxLoad}
				setValue={setMaxLoad}
				placeholder="Enter Max Load"
				label="Max Load"
				error={errors?.maxLoad}
			/>
			<Button variant="secondary" onClick={handleSubmit}>
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
