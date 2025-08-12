import {
	Blinds,
	Grid2X2Check,
	LetterText,
	ListOrdered,
	RulerDimensionLine,
	RulerIcon,
} from "lucide-react";
import { CoRunIcon } from "../icons/corun";
import { InfoIcon } from "../icons/info";
import { Ban } from "lucide-react";
import { RuleItem } from "./ruleItem";
import { Button } from "../ui/button";
import { RuleInput } from "./ruleInput";
import { useState } from "react";
import { Card } from "../ui/card";
import { AiIcon } from "../icons/ai";

export function RulesForm() {
	const [rule, setRule] = useState<string | null>(null);

	return (
		<div className="flex flex-col gap-4 p-4">
			<div className="grid grid-cols-2 gap-2  rounded-lg">
				<RuleItem
					onClick={() => setRule("CoRun")}
					Name="CoRun"
					icon={<CoRunIcon />}
					description="This rule allows for concurrent execution of tasks. Co-run: select two or more TaskIDs and co run"
				/>
				<RuleItem
					onClick={() => setRule("Slot Restriction")}
					Name="Slot Restiction"
					icon={<Ban />}
					description="Slot-restriction: choose a ClientGroup or WorkerGroup + minCommonSlots"
				/>
				<RuleItem
					onClick={() => setRule("Load-limit")}
					Name="Load-limit"
					icon={<RulerDimensionLine />}
					description="Load-limit: select a WorkerGroup + maxSlotsPerPhase"
				/>
				<RuleItem
					onClick={() => setRule("Phase-Window")}
					Name="Phase-window"
					icon={<Grid2X2Check />}
					description="Phase-window: pick a TaskID + allowed phase list/range
"
				/>
				<RuleItem
					onClick={() => setRule("Pattern-match")}
					Name="The Alchemist AI"
					icon={<AiIcon />}
					description="Ask out Alchemist Ai to create a rule for you."
				/>
				<RuleItem
					onClick={() => setRule("Precedence override")}
					Name="Precedence override"
					icon={<ListOrdered />}
					description="Precedence override: define global vs. specific rules with explicit priority order"
				/>
			</div>
			{rule && (
				<div className="flex gap-5 justify-center  ">
					<Card className="border p-4 rounded-2xl w-fit bg-muted">
						{" "}
						<RuleInput rule={rule} />
					</Card>
					
				</div>
			)}
		</div>
	);
}
