import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AiRules() {
	const [loading, setLoading] = useState(false);
	return (
		<div className="w-xl flex flex-col gap-4">
			<h2>AI Rules</h2>
			<p>Ask our Ai models to create a rule for you.</p>
			<div>
				<textarea className="border border-black rounded-md p-2 w-full" rows={4} placeholder="Describe your rule..."></textarea>
			</div>
            <Button disabled={loading} variant={"secondary"}>{loading ? "Generating..." : "Generate"}</Button>
		</div>
	);
}
