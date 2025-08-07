'use client'
import { useRuleForm } from "@/lib/store/data";
import { Label } from "@radix-ui/react-label";
import { memo } from "react";
import { Button } from "../ui/button";
import { RulesPage } from "../rules";


const SidebarFooterContainer = memo(function SidebarFooterContainer(){
    const setVisible = useRuleForm(s => s.setVisible)
   
    return (
        <div className="flex flex-col gap-2 p-5">
            <Label className="text-sm text-muted-foreground">Rules</Label>
         
           <RulesPage />
        </div>
    )
})
export { SidebarFooterContainer }