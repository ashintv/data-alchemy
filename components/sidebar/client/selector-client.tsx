import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction } from "react"


export function SortSelector({ value, setSelected }: SelectorProps) {
    return (
        <Select value={value} onValueChange={(value) => {
            setSelected(value as "Priority" | "ClientID" | "Req.Task");
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ClientID" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"Priority"}>Priority</SelectItem>
                <SelectItem value={'ClientID'}>ClientID</SelectItem>
                <SelectItem value={'Req.Task'}>Req.task</SelectItem>
            </SelectContent>
        </Select>
    )
}
interface SelectorProps {
    value: string
    setSelected:  Dispatch<SetStateAction<"Priority" | "ClientID" | "Req.Task">>
}