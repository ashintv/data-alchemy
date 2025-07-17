import { z } from "zod"

export const WorkerSchema = z.object({
	WorkerID: z.string().min(1, "WorkerID is required"),
	WorkerName: z.string().min(1, "WorkerName is required"),
	Skills: z
		.string()
		.transform((val) =>
			val
				.replace(/\//g, ",") // Replace `/` with `,`
				.split(",")
				.map((w) => w.trim())
				.filter(Boolean)
		)
		.pipe(
			z
				.array(z.string().regex(/^[a-zA-Z0-9]+$/, "Each skill must be alphanumeric only"))
				.min(1, "At least one skill required")
		),
	AvailableSlots: z
		.string()
		.regex(
			/^\[\s*(\d+\s*(,\s*\d+\s*)*)\]$/,
			"AvailableSlots must be integers separated by commas inside [ ]"
		)
		.transform((val) => {
			// Remove [ ] and split
			return val
				.slice(1, -1)
				.split(",")
				.map((s) => s.trim())
		})
		.refine((arr) => arr.every((s) => /^\d+$/.test(s)), {
			message: "AvailableSlots must contain only non-negative integers",
		})
		.transform((arr) => arr.map(Number))
		.refine((arr) => arr.every((n) => Number.isInteger(n) && n >= 0), {
			message: "AvailableSlots must contain valid non-negative integers",
		})
		.refine((arr) => arr.length > 0, {
			message: "AvailableSlots must contain at least one value",
		}),
	MaxLoadPerPhase: z.string().regex(/^[1-5]$/, "MaxLoadPerPhase must be 1–5"),
	WorkerGroup: z.string().min(1, "WorkerGroup is required"),
	QualificationLevel: z.string().regex(/^[1-5]$/, "QualificationLevel must be 1–5"),
})
