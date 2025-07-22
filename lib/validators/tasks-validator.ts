import { TaskSchema } from "../schema/tasks"
import { Task } from "../store/data"


export const checkErrorsTask = (task: Task, WorkerSkills: string[]) => {
        const parse = TaskSchema.safeParse(task)
        const errors_gen: Record<string, string> = {}
        if (!parse.success) {
                const errors: any[] = JSON.parse(parse.error.message)
                console.table(errors)
                errors.forEach((x) => {
                        errors_gen[x.path[0]] = x.message
                })
                return errors_gen
        }
        const RequiredSkills = task.RequiredSkills.split(',').map(x => x.trim())
        for (const x of RequiredSkills) {
                if (!WorkerSkills.includes(x)) {
                        errors_gen["RequiredSkills"] = "skill is not possessed by worker"
                        return errors_gen
                }
        }
        return null
}

