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
import { Client, Task, useDataStore, Worker } from "@/lib/store/data"

export function AlertDelete(props:AlerDeleteI) {
	const { setClients ,  setWorkers , setTasks} = useDataStore()
	function handleDelete(){
		if (props.Clients){
			props.Clients.splice(props.index , 1)
		}
		else if(props.Tasks){
			props.Tasks.splice(props.index ,1)
		}
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">Delete</Button>
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

interface AlerDeleteI{
	index : number , 
	Workers?: Worker [],
	Clients? : Client [],
	Tasks? :Task []

}