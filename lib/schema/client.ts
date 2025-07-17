import { z } from "zod"
export const ClientSchema = z.object({
	ClientID: z.string().regex(/^C\d+$/, { message: "Invalid ClientID format" }),
	ClientName: z.string().min(1, { message: "ClientName is required" }),
	PriorityLevel: z.enum(['1','2','3','4','5'] ,{ message: "Must be 1 to 5" } ),
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
