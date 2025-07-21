'use client'
import { useRuleForm } from "@/lib/store/data";
import { Label } from "@radix-ui/react-label";
import { memo } from "react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const SidebarFooterContainer = memo(() => {
    const setVisible = useRuleForm(s => s.setVisible)
   
    return (
        <div className="flex flex-col gap-2 p-5">
            <Label className="text-sm text-muted-foreground">Rules</Label>
            <Button onClick={() => setVisible(true)} variant="outline" className="w-full">
                New Rule +
            </Button>
        </div>
    )
})
export { SidebarFooterContainer }