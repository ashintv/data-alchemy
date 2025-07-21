'use client';
import { memo } from "react";
import { SidebarContent, SidebarGroup, SidebarMenu } from "../ui/sidebar";
import { Label } from "@radix-ui/react-label";
import { SidebarLabel } from "./sidebar-label";
import { useSidebar } from "@/lib/store/data";
import { set } from "zod";
import { SidebarClient } from "./sidebar-client";

export const SidebarContents = () => {
    const {currentTab ,setCurrentTab} = useSidebar()
    return (
        <SidebarContent >
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarLabel onClick={()=>{
                        setCurrentTab('clients')
                    }} isSelected={currentTab=='clients'}>Clients</SidebarLabel>
                    <SidebarLabel onClick={()=>{
                        setCurrentTab('workers')
                    }} isSelected={currentTab=='workers'}>Workers</SidebarLabel>
                    <SidebarLabel onClick={()=>{
                        setCurrentTab('tasks')
                    }} isSelected={currentTab=='tasks'}>Tasks</SidebarLabel>
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
                {currentTab === 'clients' && <SidebarClient/>}
            </SidebarGroup>
        </SidebarContent>
    )
}



