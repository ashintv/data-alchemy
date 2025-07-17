import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";

export function Field(worker:FielsI) {
	return (
		<div>
			<div className="flex flex-col">
				<Label className="text-sm font-medium">{worker.field}</Label>
				<Input
					type="text"
					value={worker.WorkerValue}
					className="border p-2 rounded"
					onChange={(e) => (worker.WorkerValue = e.target.value)}
				/>
			</div>
		</div>
	)
}

interface FielsI{
        WorkerValue:string | number
	field:string
}