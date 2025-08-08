import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RulesForm } from "./forms/rules";
import { InfoIcon } from "./icons/info";
import { Button } from "./ui/button";
import { BadgeInfoIcon } from "lucide-react";

export function RulesPage() {
	return (
		<Dialog>
			<DialogTrigger className="border border-background rounded-xl px-3 py-2 hover:bg-background hover:text-foreground transition-all duration-200">
				New Rule +
			</DialogTrigger>
			<DialogContent className="min-w-5xl">
				<DialogHeader>
					<DialogTitle>Create a New Rule</DialogTitle>
					<RulesForm />
					<div className="w-full flex justify-between items-center p-4">
						<span>Please provide the details for the new rule you want to create.</span>
						<Button  className="text-background hover:cursor-pointer">Show Current Rules <BadgeInfoIcon /></Button>
					</div>
					
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
