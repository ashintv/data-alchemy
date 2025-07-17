import { DeleteIcon } from "@/components/icons/delete"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Dispatch, SetStateAction, useState } from "react"
export function Skills({skills ,  setSkills}:skillsPorps) {
        const [skill ,  setSkill] =  useState('')
	return (
		<div className="flex flex-col">
			<Label className="text-sm font-medium">Skills</Label>
			<div className="flex flex-col gap-1 ml-5">
				{skills.map((x, index) => (
					<div
						key={index}
						className="w-full flex items-center px-2 rounded bg-primary/10 justify-between ">
						<Label className="text-sm ">{`${index + 1}. ${x}`}</Label>
						<Button
							onClick={() => {
								setSkills(skills.filter((_, i) => i != index))
							}}
							variant={"outline"}
							className="bg-transparent text-destructive/50 hover:text-destructive border-0">
							<DeleteIcon/>
						</Button>
					</div>
				))}
				<div className="flex gap-1 ">
					<Input value={skill} onChange={(e)=>{
                                                setSkill(e.target.value)
                                        }} className="px-5 border" placeholder="Add new Skill"></Input>
					<Button onClick={()=>{
                                                if(skill=='') return
                                                setSkills((prev)=>([...prev,skill]))
                                                setSkill('')

                                        }}>Add</Button>
				</div>
			</div>
		</div>
	)
}

interface skillsPorps{
        skills: string[],
        setSkills: Dispatch<SetStateAction<string[]>>


}
