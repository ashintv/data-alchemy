import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction } from "react"


export function SortSelectorWorker({ value, setSelected }: SelectorProps) {
    return (
        <Select value={value}    onValueChange={(value) => {
            setSelected(value as "WorkerID" | "Qualification Level" | "Available Slots");
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="WorkerID" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"Qualification Level"}>Qualification Level</SelectItem>
                <SelectItem value={'WorkerID'}>WorkerID</SelectItem>
                <SelectItem value={'Available Slots'}>Available Slots</SelectItem>
            </SelectContent>
        </Select>
    )
}
interface SelectorProps {
    value: string
    setSelected:  Dispatch<SetStateAction<"WorkerID" | "Qualification Level" | "Available Slots">>
}