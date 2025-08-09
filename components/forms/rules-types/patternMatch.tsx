import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PatternMatch() {
	return (
		<div className="w-xl flex flex-col gap-4">
			<h2>Pattern Match Rule</h2>
			<p>Enter your regex pattern and select a rule template.</p>
			<div className="flex items-center">
				<Label className="mr-2">Regex Pattern:</Label>
				<Input className="border border-black rounded-md p-2 w-full" />
			</div>
			<div className="flex items-center">
				<Label className="mr-2">Select Rule Template:</Label>
				<select className="border border-black rounded-md p-2 w-full">
					<option value="template1">Template 1</option>
					<option value="template2">Template 2</option>
				</select>
			</div>
            <Button variant={"secondary"}>Submit</Button>
		</div>
	);
}
