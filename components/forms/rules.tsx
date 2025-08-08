import {
	Blinds,
	Grid2X2Check,
	LetterText,
	ListOrdered,
	RulerDimensionLine,
} from "lucide-react";
import { CoRunIcon } from "../icons/corun";
import { InfoIcon } from "../icons/info";
import { Ban } from "lucide-react";
import { RuleItem } from "./ruleItem";
import { Button } from "../ui/button";

export function RulesForm() {
	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-2 gap-2 p-4 rounded-lg">
				<RuleItem
					Name="CoRun"
					icon={<CoRunIcon />}
					description="This rule allows for concurrent execution of tasks. Co-run: select two or more TaskIDs and co run"
				/>
				<RuleItem
					Name="Slot Restiction"
					icon={<Ban />}
					description="Slot-restriction: choose a ClientGroup or WorkerGroup + minCommonSlots"
				/>
				<RuleItem
					Name="Load-limit"
					icon={<RulerDimensionLine />}
					description="Load-limit: select a WorkerGroup + maxSlotsPerPhase"
				/>
				<RuleItem
					Name="Phase-window"
					icon={<Grid2X2Check />}
					description="Phase-window: pick a TaskID + allowed phase list/range
"
				/>
				<RuleItem
					Name="Pattern-match"
					icon={<LetterText />}
					description="Pattern-match: enter a regex + choose a rule template + parameters
"
				/>
				<RuleItem
					Name="Rule 6"
					icon={<ListOrdered />}
					description="Precedence override: define global vs. specific rules with explicit priority order"
				/>
			</div>
		</div>
	);
}


