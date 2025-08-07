import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RulesForm } from "./forms/rules";

export function RulesPage() {
 	return (
		<Dialog>
			<DialogTrigger className="border border-background rounded-xl px-3 py-2 hover:bg-background hover:text-foreground transition-all duration-200">New Rule +</DialogTrigger>
			<DialogContent className="min-w-5xl">
				<DialogHeader>
					<DialogTitle>Create a New Rule</DialogTitle>
         <RulesForm />
					<DialogDescription>
							Please provide the details for the new rule you want to create.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

