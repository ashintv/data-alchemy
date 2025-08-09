import { Input } from "../ui/input"
import { CoRun } from "./rules-types/corun"
import { SlotRestriction } from "./rules-types/slotRestriction";

export function RuleInput({ rule }: RuleInputProps){
    return (
			<>
				{rule === "CoRun" && <CoRun />}
				{rule === "Slot Restriction" && <SlotRestriction />}
			</>
		);
}

interface RuleInputProps {
    rule:string
}
