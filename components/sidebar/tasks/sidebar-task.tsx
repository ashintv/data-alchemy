import { useDataStore } from "@/lib/store/data";
import { Label } from "@radix-ui/react-label";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { SortSelectorTask } from "./selector-task";



export function SidebarTask() {
    const setTasks = useDataStore(useShallow((s) => s.setTasks))
    const [selected, setSelected] = useState<"TaskID"  | "MaxConcurrent">('TaskID')
    useEffect(() => {
        if (selected === 'TaskID') {
            setTasks((task) => [...task].sort((a, b) => parseInt(a.TaskID.slice(1)) - parseInt(b.TaskID.slice(1))))
        } else if (selected === 'MaxConcurrent') {
            setTasks((task) => [...task].sort((a, b) => parseInt(b.MaxConcurrent) - parseInt(a.MaxConcurrent)))
        }
        
    }, [selected,setTasks])
    return (
        <div className="flex flex-col border rounded-xl p-2  text-md border-primary/20 gap-2">
            Sort by : <SortSelectorTask value={selected} setSelected={setSelected} />
            {<Label>Sort by: {selected}</Label>}

        </div>
    )
}
