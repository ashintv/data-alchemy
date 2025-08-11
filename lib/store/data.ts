import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface error {
	field: string;
	error: string | null;
}
export interface Client {
	ClientID: string;
	ClientName: string;
	PriorityLevel: string;
	RequestedTaskIDs: string;
	GroupTag: string;
	AttributesJSON: string;
	error?: Record<string, string>;
}
export interface Worker {
	WorkerID: string;
	WorkerName: string;
	Skills: string;
	AvailableSlots: string;
	MaxLoadPerPhase: string;
	WorkerGroup: string;
	QualificationLevel: string;
	error?: Record<string, string>;
}

export interface Task {
	TaskID: string;
	TaskName: string;
	Category: string;
	Duration: string;
	RequiredSkills: string;
	PreferredPhases: string;
	MaxConcurrent: string;
	error?: Record<string, string>;
}

export interface DataStore {
	clients: Client[];
	workers: Worker[];
	tasks: Task[];
	setClients: (updater: (clients: Client[]) => Client[]) => void;
	setWorkers: (updater: (workers: Worker[]) => Worker[]) => void;
	setTasks: (updater: (tasks: Task[]) => Task[]) => void;
}

interface SideBarState {
	currentTab: "clients" | "workers" | "tasks";
	setCurrentTab: (tab: "clients" | "workers" | "tasks") => void;
}

interface RuleForm {
	visible: boolean;
	setVisible: (visible: boolean) => void;
}

// Rule form store (persistent)
export const useRuleForm = create<RuleForm>()(
	persist(
		(set) => ({
			visible: false,
			setVisible: (visible) => set({ visible }),
		}),
		{
			name: "rule-form",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

// Sidebar store (persistent)
export const useSidebar = create<SideBarState>()(
	persist(
		(set) => ({
			currentTab: "clients",
			setCurrentTab: (tab) => set({ currentTab: tab }),
		}),
		{
			name: "sidebar-state",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

// Data store (persistent)
export const useDataStore = create<DataStore>()(
	persist(
		(set) => ({
			clients: [],
			workers: [],
			tasks: [],

			setClients: (updater) =>
				set((state) => ({
					clients: updater(state.clients),
				})),
			setWorkers: (updater) =>
				set((state) => ({
					workers: updater(state.workers),
				})),
			setTasks: (updater) =>
				set((state) => ({
					tasks: updater(state.tasks),
				})),
		}),
		{
			name: "data-store",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
