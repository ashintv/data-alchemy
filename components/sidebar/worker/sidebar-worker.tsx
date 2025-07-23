import { useDataStore } from "@/lib/store/data";
import { Label } from "@radix-ui/react-label";
import { useShallow } from "zustand/react/shallow";

import { useEffect, useState } from "react";
import { SortSelectorWorker } from "./selector-worker";


export function SidebarWorker() {
    const setWorkers = useDataStore(useShallow((s) => s.setWorkers))
    const [selected, setSelected] = useState<"WorkerID" | "Qualification Level" | "Available Slots">('WorkerID')
    useEffect(() => {
        if (selected === 'Qualification Level') {
            setWorkers((worker) => [...worker].sort((a, b) => parseInt(b.QualificationLevel) - parseInt(a.QualificationLevel)))
        } else if (selected === 'WorkerID') {
            setWorkers((worker) => [...worker].sort((a, b) => parseInt(a.WorkerID.slice(1)) - parseInt(b.WorkerID.slice(1))))
        } else if (selected === 'Available Slots') {
            setWorkers((worker) => [...worker].sort((a, b) => b.AvailableSlots.length - a.AvailableSlots.length))
        }
    }, [selected,setWorkers])
    return (
        <div className="flex flex-col border rounded-xl p-2  text-md border-primary/20 gap-2">
            Sort by : <SortSelectorWorker value={selected} setSelected={setSelected} />
            {<Label>Sort by: {selected}</Label>}
        </div>
    )
}
