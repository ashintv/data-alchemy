import { z } from "zod"
export const ClientSchema = z.object({
	ClientID: z.string().regex(/^C\d+$/, { message: "Invalid ClientID format" }),
	ClientName: z.string().min(1, { message: "ClientName is required" }),
	PriorityLevel: z
		.string()
		.transform((val) => parseInt(val, 10))
		.refine((val) => !isNaN(val), { message: "PriorityLevel must be a number" })
		.refine((val) => Number.isInteger(val), { message: "Must be an integer" })
		.refine((val) => val >= 1 && val <= 5, { message: "Must be 1 to 5" }),
	RequestedTaskIDs: z
		.string()
		.transform((val) =>
			val
				.split(",")
				.map((id) => id.trim())
				.filter(Boolean)
		)
		.pipe(z.array(z.string().regex(/^T\d+$/, { message: "Invalid Task ID" })).min(1, { message: "Must have at least 1 Task ID" })),
	GroupTag: z.string().regex(/^Group[A-Z]$/, { message: "Invalid GroupTag" }),
	AttributesJSON: z.any(),
})
