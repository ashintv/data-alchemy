import { Client } from "@/lib/store/data"
import { ClientSchema } from "../schema/client"
export const checkErrors = (client: Client) => {
	const parse = ClientSchema.safeParse(client)
	if (!parse.success) {
		const errors_gen: Record<string, string> = {}
		const errors: any[] = JSON.parse(parse.error.message)
		console.table(errors)
		errors.forEach((x) => {
			errors_gen[x.path[0]] = x.message
		})
		return errors_gen
	}
	// clinet - tasks
	return null
}
export const clientValidators = (Clients: Client[]) => {
	Clients.forEach((x) => {
		const error = checkErrors(x)
		if (error) {
			x.error = error
		} else {
			if (x.error) {
				delete x.error
			}
		}
	})
        return Clients
}
