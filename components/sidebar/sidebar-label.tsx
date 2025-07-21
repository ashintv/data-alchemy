import { Label } from "@radix-ui/react-label"
import { memo } from "react"

export const SidebarLabel = memo(({ children , isSelected ,onClick }: { children: React.ReactNode,isSelected:boolean , onClick: () => void }) => {
    return (
        <Label onClick={onClick } className={`text-md border-primary font-medium py-1 text-muted-foreground hover:bg-primary/10  rounded my-0.5 px-2 r w-full ${isSelected ? "bg-primary/5 border  not-even:" : ""}`}>
            {children}
        </Label>
    )
})
