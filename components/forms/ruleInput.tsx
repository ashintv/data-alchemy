import { Input } from "../ui/input"
import { CoRun } from "./rules-types/corun"
import { LoadLimit } from "./rules-types/loadlimit";
import { AiRules } from "./rules-types/airules";
import { PhaseWindow } from "./rules-types/phaseWindow";
import { SlotRestriction } from "./rules-types/slotRestriction";

export function RuleInput({ rule }: RuleInputProps){
    return (
			<>
				{rule === "CoRun" && <CoRun />}
				{rule === "Slot Restriction" && <SlotRestriction />}
				{rule === "Phase-Window" && <PhaseWindow />}
				{rule === "Pattern-match" && <AiRules />}
				{rule === "Load-limit" && <LoadLimit />}
			</>
		);
}

interface RuleInputProps {
    rule:string
}
