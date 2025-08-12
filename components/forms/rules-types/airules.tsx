import { JsonToTableWrapper } from "@/components/jsonToTableWraper";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { HTTP_SERVER } from "@/config";
import { Rule } from "@/lib/store/rules";
import axios from "axios";
import { useState } from "react";
import { set } from "zod";

export function AiRules() {
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);
	const [prompt, setPrompt] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<Rule | null>(null);

	async function handleGenerate() {
		try {
			
			setLoading(true);
			const response = await axios.post(HTTP_SERVER + "/api/generate", {
				prompt,
			});
			alert("Recieved response");
			console.log(response.data.data);
			setData(response.data.data);
			setDone(true);
			setLoading(false);
		} catch (error) {
			alert("Error occurred");
			console.error(error);
			setError("Failed to generate rule");
			setDone(true);
			setLoading(false);
		}
	}

	return (
		<div className="w-xl flex flex-col gap-4 text-black">
			<h2>AI Rules</h2>
			<p>Ask our AI models to create a rule for you.</p>
			<JsonToTableWrapper
				data={data}
				done={done}
				setDone={setDone}
				error={error ? error : null}
				setError={setError}
			/>
			<div>
				<textarea
					onChange={(e) => setPrompt(e.target.value)}
					className="border border-black rounded-md p-2 w-full"
					rows={4}
					placeholder="Describe your rule..."></textarea>
			</div>

			<Button disabled={loading} variant="secondary" onClick={handleGenerate}>
				{loading ? "Generating..." : "Generate"}
			</Button>
		</div>
	);
}
