import { int } from "zod";
import { EditableJsonTable } from "./jsonTotable";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { useRulesStore } from "@/lib/store/rules";
import { useShallow } from "zustand/react/shallow";
import { error } from "console";
export function JsonToTableWrapper({
	data,
	done,
	setDone,
	error,
    setError
}: JsonToTableWrapperProps) {
	const addRule = useRulesStore(useShallow((state) => state.addRule));
	function handleSubmit() {
		if (!data) return;
		addRule(data);
		setDone(false);
	}
	return (
		<Dialog open={done} onOpenChange={(open) => setDone(open)}>
			<DialogContent className="backdrop-blur-sm bg-white sm:max-w-lg text-black">
				<DialogHeader>
					<DialogTitle>{error ? "Rule creation failed!" : "Rule created successfully!"}</DialogTitle>
					<DialogDescription className={error ? "text-red-500" : ""}>
						{
                            error ? "Failed to create rule. Please try again with a different prompt.":"You can edit the rule below before saving."
                        }
					</DialogDescription>
				</DialogHeader>
				{error ? (
					<p className="text-red-500">{error}</p>
				) : (
					<EditableJsonTable data={data} />
				)}
				<DialogFooter>
					<Button variant="secondary" onClick={() => {setError(null); setDone(false)}}>
						{error ? "Close" : "Cancel"}
					</Button>
					{!error && <Button onClick={handleSubmit}>Save</Button>}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
interface JsonToTableWrapperProps {
	data: any;
	done: boolean;
	setDone: (done: boolean) => void;
	error: string | null;
    setError: (error: string | null) => void;
}
    