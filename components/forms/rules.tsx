import { Car } from "lucide-react";
import { Button } from "../ui/button"
import { Card } from "../ui/card";

export function RulesForm() {
	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-2 gap-2 p-4 rounded-lg">
				<RuleItem />
				<RuleItem />
				<RuleItem />
				<RuleItem />
				<RuleItem />
				<RuleItem />
			</div>
			<div className="flex flex-col gap-2">
				<label
					htmlFor="rule-description"
					className="text-sm text-muted-foreground">
					Description
				</label>
				<textarea
					id="rule-description"
					placeholder="Enter rule description"
					className="textarea textarea-bordered w-full"
				/>
			</div>
		</div>
	);
}



export function RuleItem(){
    return (
       <Card className="p-4">
        <h2 className="text-lg font-bold">Rule 2</h2>
        <p className="text-sm text-muted-foreground">This rule applies to all cars.</p>
        <div className="flex items-center justify-between mt-2">
            <Button onClick={() => {}} variant="outline" size="sm" className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                View Details
            </Button>
            
        </div>
       </Card>
    )
}
