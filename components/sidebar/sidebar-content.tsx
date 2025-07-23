'use client';
import { memo } from "react";
import {  SidebarContent, SidebarGroup} from "../ui/sidebar";
import { useSidebar } from "@/lib/store/data";
import { SidebarClient } from "./client/sidebar-client";
import { SidebarTask } from "./tasks/sidebar-task";
import { SidebarWorker } from "./worker/sidebar-worker";
export const SidebarContents = memo(function SidebarContents(){
    const { currentTab} = useSidebar()
    return (
        <SidebarContent >
            <SidebarGroup>
                {currentTab === 'clients' && <SidebarClient />}
                {currentTab === 'tasks' && <SidebarTask />}
                {currentTab === 'workers' && <SidebarWorker />}
            </SidebarGroup>
        </SidebarContent>
    )
})



