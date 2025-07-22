import { Client } from "@/lib/store/data"
import { ClientSchema } from "../schema/client"
export const checkErrors = (client: Client, tasks: string[]) => {
	const errors_gen: Record<string, string> = {}
	const parse = ClientSchema.safeParse(client)
	if (!parse.success) {
		const errors: any[] = JSON.parse(parse.error.message)
		errors.forEach((x) => {
			errors_gen[x.path[0]] = x.message
		})
		return errors_gen
	}
	const RequestedTaskIDs = client.RequestedTaskIDs.split(',').map(x => x.trim())
	for (const x of RequestedTaskIDs) {
		if (!tasks.includes(x)) {
			errors_gen["RequestedTaskIDs"] = "task does not exist"
			return errors_gen 
		}
	}
	return null
}

