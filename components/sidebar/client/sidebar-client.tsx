import { useDataStore } from "@/lib/store/data";
import { useShallow } from "zustand/react/shallow";
import { SortSelector } from "./selector-client";
import { useEffect, useState } from "react";


export function SidebarClient() {
    const setClients = useDataStore(useShallow((s) => s.setClients))
    const [selected, setSelected] = useState<'Priority' | 'ClientID' | 'Req.Task'>('ClientID')
    useEffect(() => {
        if (selected === 'Priority') {
            setClients((clients_) => [...clients_].sort((a, b) => parseInt(b.PriorityLevel) - parseInt(a.PriorityLevel)))
        } else if (selected === 'ClientID') {
            setClients((clients_) => [...clients_].sort((a, b) => parseInt(a.ClientID.slice(1)) - parseInt(b.ClientID.slice(1))))
        } else if (selected === 'Req.Task') {
            setClients((clients_) => [...clients_].sort((a, b) => b.RequestedTaskIDs.length - a.RequestedTaskIDs.length))
        }
    }, [selected, setClients]);
    return (
        <div className="flex flex-col border rounded-xl p-2  text-md border-primary/20 gap-2">
            Sort by : <SortSelector value={selected} setSelected={setSelected} />

        </div>
    )
}
