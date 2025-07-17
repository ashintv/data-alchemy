import { Worker } from "@/lib/store/data"
import { WorkerSchema } from "../schema/worker"

export const checkErrorsWorker = (worker: Worker) => {
	const parse = WorkerSchema.safeParse(worker)
	if (!parse.success) {
		const errors_gen: Record<string, string> = {}
		const errors: any[] = JSON.parse(parse.error.message)
		console.table(errors)
		errors.forEach((x) => {
			errors_gen[x.path[0]] = x.message
		})
		return errors_gen
	}
	return null
}

export const workerValidors = (Workers: Worker[]) => {
	Workers.forEach((x) => {
		const error = checkErrorsWorker(x)
		if (error) {
			x.error = error
		} else {
			if (x.error) {
				delete x.error
			}
		}
	})
	return Workers
}
