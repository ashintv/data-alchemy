'use client';
import { memo } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu } from "../ui/sidebar";
import { Label } from "@radix-ui/react-label";
import { SidebarLabel } from "./sidebar-label";
import { useSidebar } from "@/lib/store/data";
import { SidebarClient } from "./client/sidebar-client";
import { SidebarTask } from "./tasks/sidebar-task";

export const SidebarContents = memo(() => {
    const { currentTab, setCurrentTab } = useSidebar()
    return (
        <SidebarContent >
            <SidebarGroup>
                {currentTab === 'clients' && <SidebarClient />}
                {currentTab === 'tasks' && <SidebarTask />}
            </SidebarGroup>
        </SidebarContent>
    )
})



