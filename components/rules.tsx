import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export function RulesPage() {
	return (
		<Dialog>
			<DialogTrigger>New Rule</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a New Rule</DialogTitle>
					<DialogDescription>
						Please provide the details for the new rule you want to create.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

