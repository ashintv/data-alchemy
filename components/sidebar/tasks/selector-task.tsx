import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction } from "react"


export function SortSelectorTask({ value, setSelected }: SelectorProps) {
    return (
        <Select value={value} onValueChange={(value) => {
            setSelected(value as "TaskID" | "MaxConcurrent");
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ClientID" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={'TaskID'}>TaskID</SelectItem>
                <SelectItem value={'MaxConcurrent'}>MaxConcurrent</SelectItem>
            </SelectContent>
        </Select>
    )
}
interface SelectorProps {
    value: string
    setSelected: Dispatch<SetStateAction<"TaskID" | "MaxConcurrent">>
}