import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDataStore } from "@/lib/store/data"



export function AlertDelete(props: AlertDeleteI) {
	const setClients = useDataStore((state) => state.setClients)
	const setWorkers = useDataStore((state) => state.setWorkers)
	const setTasks = useDataStore((state) => state.setTasks)
	function handleDelete() {
		if (props.table === "clients") {
			setClients((clients) => clients.filter((_, index) => index !== props.index))
		} else if (props.table === "tasks") {
			setTasks((tasks) => tasks.filter((_, index) => index !== props.index))
		} else if (props.table === "workers") {
			setWorkers((workers) => workers.filter((_, index) => index !== props.index))
		}
	}
	
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="rounded-none text-secondary" variant="link">Delete</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your data and
						remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

interface AlertDeleteI{
	index : number , 
	table: "clients" | "tasks" | "workers"

}