import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function SlotRestriction() {
	const [type, setType] = useState<string>("worker");
	const [groupId, setGroupId] = useState<string>("");
	const [minCommonSlots, setMinCommonSlots] = useState<number | null>(null);

	return (
		<div className="w-xl flex flex-col gap-4">
			<h2>Slot Restriction Rule</h2>
			<select className="border border-black rounded-md p-2 w-full px-5" value={type} onChange={(e) => setType(e.target.value)}>
				<option value="worker">Worker Group</option>
				<option value="client">Client Group</option>
			</select>
			<div className="flex items-center">
				<Label className="mr-2">Enter {type} Group ID:</Label>
				<Input
					className="border b rounded-md p-2 w-full"
					placeholder={`Enter ${type} GroupID`}
					value={groupId}
					onChange={(e) => setGroupId(e.target.value)}
				/>
			</div>
			<div className="flex items-center">
				<Label className="">Enter minimum common slots:</Label>
				<Input
					className="border  rounded-md p-2 w-full"
					type="number"
					placeholder="Enter minCommonSlots"
					value={minCommonSlots || ""}
					onChange={(e) => setMinCommonSlots(Number(e.target.value))}
				/>
			
			</div>

			<Button variant={"secondary"} type="submit">Submit</Button>
		</div>
	);
}
