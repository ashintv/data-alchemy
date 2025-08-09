import { create } from "zustand";

// Common base for all rules
interface BaseRule {
	id: string;
	name: string;
	description?: string;
	priority: number;
}

// 1. Co-run: run tasks together
interface CoRunRule extends BaseRule {
	type: "coRun";
	tasks: string[];
}

// 2. Slot restriction
interface SlotRestrictionRule extends BaseRule {
	type: "slotRestriction";
	groupType: "ClientGroup" | "WorkerGroup";
	groupId: string;
	minCommonSlots: number;
}

// 3. Load limit
interface LoadLimitRule extends BaseRule {
	type: "loadLimit";
	workerGroupId: string;
	maxSlotsPerPhase: number;
}

// 4. Phase window
interface PhaseWindowRule extends BaseRule {
	type: "phaseWindow";
	taskId: string;
	allowedPhases: string[];
}

// 5. Pattern match
interface PatternMatchRule extends BaseRule {
	type: "patternMatch";
	regex: string;
	templateId: string;
	parameters: Record<string, any>;
}

// 6. Precedence override
interface PrecedenceOverrideRule extends BaseRule {
	type: "precedenceOverride";
	globalRules: string[];
	specificRules: string[];
	priorityOrder: "globalFirst" | "specificFirst";
}

// Union type for all rule variants
type Rule =
	| CoRunRule
	| SlotRestrictionRule
	| LoadLimitRule
	| PhaseWindowRule
	| PatternMatchRule
	| PrecedenceOverrideRule;

// Example usage
const exampleRule: Rule = {
	id: "rule-001",
	name: "Run Task 12 and 15 together",
	type: "coRun",
	tasks: ["task-12", "task-15"],
	priority: 1,
};

interface RulesStore {
	rules: Rule[];
	setRules: (updater: (rules: Rule[]) => Rule[]) => void;
	addRule: (rule: Rule) => void;
	removeRule: (id: string) => void;
}

export const useRulesStore = create<RulesStore>((set) => ({
	rules: [],
	setRules: (updater) => {
		set((state) => ({
			rules: updater(state.rules),
		}));
	},
	addRule: (rule) => {
		set((state) => ({
			rules: [...state.rules, rule],
		}));
	},
	removeRule: (id) => {
		set((state) => ({
			rules: state.rules.filter((r) => r.id !== id),
		}));
	},
}));
