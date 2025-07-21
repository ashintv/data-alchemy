import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export function Selector({ value, onChange }: SelectorProps) {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a rule" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={value}>phaseWindow</SelectItem>
            </SelectContent>
        </Select>
    )
}
interface SelectorProps {
    value: string
    onChange: (value: string) => void
}
