import { create } from "zustand"

export interface error {
	field: string
	error: string | null
}
export interface Client {
	ClientID: string
	ClientName: string
	PriorityLevel: string
	RequestedTaskIDs: string
	GroupTag: string
	// AttributesJSON: string
	error?: Record<string, string>
}
export interface Worker {
	WorkerID: string
	WorkerName: string
	Skills: string
	AvailableSlots: string
	MaxLoadPerPhase: string
	WorkerGroup: string
	QualificationLevel: string
	error?: Record<string, string>
}

export interface Task {
	TaskID: string
	TaskName: string
	Category: string
	Duration: string
	RequiredSkills: string
	PreferredPhases: string
	MaxConcurrent: string
	error?: Record<string, string>
}

export interface DataStore {
	clients: Client[]
	workers: Worker[]
	tasks: Task[]
	setClients: (updater: (clients: Client[]) => Client[]) => void
	setWorkers: (updater: (clients: Worker[]) => Worker[]) => void
	setTasks: (updater: (clients: Task[]) => Task[]) => void
}

export const useDataStore = create<DataStore>((set) => ({
	clients: [],
	workers: [],
	tasks: [],
	setClients: (updater) => {
		set((state) => {
			const next = updater(state.clients)
			return { clients: next }
		})
	},
	setWorkers: (updater) => {
		set((state) => {
			const next = updater(state.workers)
			return { workers: next }
		})
	},
	setTasks: (updater) => {
		set((state) => {
			const next = updater(state.tasks)
			return { tasks: next }
		})
	},
}))
