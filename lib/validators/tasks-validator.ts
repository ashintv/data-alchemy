import { TaskSchema } from "../schema/tasks"
import { Task } from "../store/data"


export const checkErrorsTask = (task: Task) => {
        const parse = TaskSchema.safeParse(task)
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

