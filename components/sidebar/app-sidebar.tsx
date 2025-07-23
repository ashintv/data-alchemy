import {
    Sidebar,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { SidebarContents } from "./sidebar-content"
import { SidebarFooterContainer } from "./sidebar-footer"


export function AppSidebar() {
    return (
        <Sidebar  className="w-64 bg-primary">
            <SidebarHeader className="flex flex-col  gap-2 p-5">
                <div className="text-4xl font-extrabold font-mono font-stretch-120%">Data Alc</div>
                <p className="text-sm text-muted-foreground">Manage your data efficiently</p>
            </SidebarHeader>
            <SidebarContents/>
            {/* <SidebarContents /> */}
            <SidebarFooterContainer />
        </Sidebar>
    )
}