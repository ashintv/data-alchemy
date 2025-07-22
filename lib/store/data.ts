
import { Sidebar } from "lucide-react"
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
	AttributesJSON: string
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
	Rules:Record<string, any> []
	setRules: (updater: (rules: Record<string, any> []) => Record<string, any> []) => void
	setClients: (updater: (clients: Client[]) => Client[]) => void
	setWorkers: (updater: (clients: Worker[]) => Worker[]) => void
	setTasks: (updater: (clients: Task[]) => Task[]) => void
}

interface SideBarState {
	currentTab: "clients" | "workers" | "tasks"
	setCurrentTab: (tab: "clients" | "workers" | "tasks") => void
}
// use rules forms
interface RuleForm {
	visible: boolean
	setVisible: (visible: boolean) => void
}

export const useRuleForm = create<RuleForm>((set) => ({
	visible: false,
	setVisible: (visible) => set({ visible }),
}))

export const useSidebar = create<SideBarState>((set) => ({
	currentTab: "clients",
	setCurrentTab: (tab: "clients" | "workers" | "tasks") => set({ currentTab: tab })
}))

// Zustand store for managing clients, workers, and tasks data

export const useDataStore = create<DataStore>((set) => ({
	clients: [],
	workers: [],
	tasks: [],
	Rules:	[],
	setRules: (updater) => {
		set((state) => {
			const next = updater(state.Rules)
			return { Rules: next }
		})
	},
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
