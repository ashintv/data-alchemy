import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDataStore } from "@/lib/store/data";
import { useRulesStore } from "@/lib/store/rules";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { InputBox } from "./InputBox";

export function SlotRestriction() {
	const [name, setName] = useState("");
	const [type, setType] = useState<string>("worker");
	const [groupId, setGroupId] = useState<string>("");
	const [minCommonSlots, setMinCommonSlots] = useState<string | null>(null);
	const addRules = useRulesStore(useShallow((state) => state.addRule));
	const [error, setError] = useState<ErrorType | null>(null);
	const workerGroups = useDataStore(
		useShallow(
			(state) => new Set(state.workers.map((worker) => worker.WorkerGroup))
		)
	);

	const clientGroups = useDataStore(
		useShallow(
			(state) => new Set(state.clients.map((client) => client.GroupTag))
		)
	);

	return (
		<div className="w-xl flex flex-col gap-4">
			<h2>Slot Restriction Rule</h2>
			<InputBox
				label="Enter rule name:"
				value={name}
				setValue={setName}
				placeholder="Enter rule name"
			/>
			<select
				className="border border-black rounded-md p-2 w-full px-5"
				value={type}
				onChange={(e) => setType(e.target.value)}>
				<option value="worker">Worker Group</option>
				<option value="client">Client Group</option>
			</select>
			<div className="flex items-center">
				<select
					className="border border-black rounded-md p-2 w-full px-5"
					value={groupId}
					onChange={(e) => setGroupId(e.target.value)}>
					<option value="">-- Select {type} Group --</option>
					{type === "worker" && (
						<>
							{Array.from(workerGroups).map((group) => (
								<option key={group} value={group}>
									{group}
								</option>
							))}
						</>
					)}
					{type === "client" && (
						<>
							{Array.from(clientGroups).map((group) => (
								<option key={group} value={group}>
									{group}
								</option>
							))}
						</>
					)}
				</select>
			</div>
			<InputBox
				label="Enter minimum common slots:"
				value={minCommonSlots || ""}
				setValue={setMinCommonSlots}
				placeholder="Enter minCommonSlots"
				error={error?.minCommonSlots || ""}
			/>

			<Button
				variant={"secondary"}
				onClick={() => {
					if (error) return;
					addRules({
						id: String(Date.now()),
						name: name || `Rule ${Date.now()}`,
						type: "slotRestriction",
						groupType: type === "worker" ? "WorkerGroup" : "ClientGroup",
						groupId,
						minCommonSlots: parseInt(minCommonSlots || "0"),
					});
				}}>
				Submit
			</Button>
		</div>
	);
}

interface ErrorType {
	groupType: string;
	groupId: string;
	minCommonSlots: string;
}
