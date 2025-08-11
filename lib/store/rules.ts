import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Common base for all rules
interface BaseRule {
	id: string;
	name: string;
	description?: string;
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

interface RulesStore {
	rules: Rule[];
	addRule: (rule: Rule) => void;
	removeRule: (id: string) => void;
}
export const useRulesStore = create<RulesStore>()(
	persist(
		(set) => ({
			rules: [],
			addRule: (rule) => {
				set((state) => ({
					rules: [rule, ...state.rules.filter((r) => r.id !== rule.id)],
				}));
				console.log("current rules:", useRulesStore.getState().rules);
			},
			removeRule: (id) =>
				set((state) => ({
					rules: state.rules.filter((r) => r.id !== id),
				})),
		}),
		{
			name: "rules-store",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
