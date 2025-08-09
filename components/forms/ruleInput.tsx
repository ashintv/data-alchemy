import { Input } from "../ui/input"
import { CoRun } from "./rules-types/corun"
import { LoadLimit } from "./rules-types/loadlimit";
import { PatternMatch } from "./rules-types/patternMatch";
import { PhaseWindow } from "./rules-types/phaseWindow";
import { SlotRestriction } from "./rules-types/slotRestriction";

export function RuleInput({ rule }: RuleInputProps){
    return (
			<>
				{rule === "CoRun" && <CoRun />}
				{rule === "Slot Restriction" && <SlotRestriction />}
				{rule === "Phase-Window" && <PhaseWindow />}
				{rule === "Pattern-match" && <PatternMatch />}
				{rule === "Load-limit" && <LoadLimit />}
			</>
		);
}

interface RuleInputProps {
    rule:string
}
