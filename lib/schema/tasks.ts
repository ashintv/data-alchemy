import { z } from "zod"

const preferredPhasesRegex = /^(\[\s*(\d+\s*(,\s*\d+\s*)*)\]|\d+\s*-\s*\d+)$/

export const TaskSchema = z.object({
	TaskID: z.string().min(1, "TaskID is required"),
	TaskName: z.string().min(1, "TaskName is required"),
	Category: z.string().min(1, "Category is required"),
	Duration: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val), {
			message: "Duration must be a number",
		})
		.refine((val) => val >= 1, {
			message: "Duration must be at least 1",
		}),

	RequiredSkills: z.string().refine((val) => val.split(",").every((s) => s.trim().length > 0), {
		message: "RequiredSkills must be comma-separated tags",
	}),
	PreferredPhases: z
		.string()
		.regex(
			preferredPhasesRegex,
			"PreferredPhases must be a range like '1-3' or a list like [2,3,4]"
		),
	MaxConcurrent: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val), {
			message: "MaxConcurrent must be a number",
		})
		.refine((val) => val >= 1, {
			message: "MaxConcurrent must be ≥ 1",
		}),
})
