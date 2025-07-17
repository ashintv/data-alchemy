import { DeleteIcon } from "@/components/icons/delete"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction, useState } from "react"

export function AvlSlots({ slots, setSlotes }: SlotProps) {
	const [input, setInput] = useState<string>("")
	const handleAdd = () => {
		if (input == "") return
                setInput('')
		const found = slots.some((x) =>x==input)
		if (found) {
                        alert("")
                        return
                }
		setSlotes((prev) => [...prev, input])
	}
	return (
		<div>
			Avialbe Slotes
			<div className="flex justify-between">
				<div className="flex flex-wrap px-5 gap-2 p-1">
					{slots.map((x, index) => (
						<div key={index} className="flex gap-1 border border-primary rounded">
							<div className="p-1">{x}</div>
							<div
								onClick={() => {
									setSlotes(slots.filter((_, i) => i != index))
								}}
								className="text-destructive/50 p-1">
								<DeleteIcon size="size-3" />
							</div>
						</div>
					))}
				</div>
				<div className="flex gap-1">
					<Input
						value={input}
						onChange={(e) => {
							setInput(e.target.value)
						}}
						className="border bg-primary/5 w-20"
						placeholder="Add new "></Input>
					<Button onClick={handleAdd}>Add</Button>
				</div>
			</div>
		</div>
	)
}
interface SlotProps {
	slots: string[]
	setSlotes: Dispatch<SetStateAction<string[]>>
}
