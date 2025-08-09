import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoadLimit() {
	return (
		<div className="w-xl flex flex-col gap-4">
			<h2>Load Limit Rule</h2>
			<p>Select WorkerGroup.</p>
			<div className="flex items-center">
				<Label className="mr-2">Worker Group:</Label>
				<Input className="border border-black rounded-md p-2 w-full" />
			</div>

			<p>Set the maximum load limit for this WorkerGroup.</p>
			<div className="flex items-center">
				<Label className="mr-2">Max Load:</Label>
				<Input className="border border-black rounded-md p-2 w-full" />
			</div>
			<Button variant={"secondary"}>Submit</Button>
		</div>
	);
}
