// 'use client'
// import { memo,  useEffect, useState } from "react"
// import { Selector } from "./selector"
// import { Button } from "../ui/button"
// import { Label } from "../ui/label"
// import { Input } from "../ui/input"
// import { Task, useDataStore, useRuleForm } from "@/lib/store/data"




// export function Rules() {
//     // const [rule, setRule] = useState<'phaseWindow' | 'other'>("phaseWindow")
//     const setVisible = useRuleForm(s => s.setVisible)
//     return (
//         <div className="inset-0 flex fixed items-center justify-end pr-20 backdrop-blur-sm bg-black/50">
//             <div className="flex  p-20 flex-col  w-3/4  bg-background backdrop:blur-2xl  rounded-lg shadow-lg">
//                 <div className="text-2xl font-extrabold text-center">Add your Rule</div>
//                 <div className="flex  gap-2  " >
//                     <Label className="items-center">Select Rule</Label>
//                     {/* <Selector value={rule} /> */}
//                 </div>
//                 <div className="grid grid-cols-2 gap-5 border rounded-2xl  my-10">
//                     <div className="col-span-1 m-15">
//                         <PhaseRule />
//                     </div>
//                     <div className="col-span-1 border m-5">
//                         <CurrentRules />
//                     </div>

//                 </div>
//                 <div className="flex  gap-2 justify-end">
//                     <Button className="mt-4" onClick={() => setVisible(false)}>Close</Button>
//                 </div>
//             </div>
//         </div>
//     )
// }


// function PhaseRuleHelper(tasks: Task[], phase: string[]): string[] {
//     const phasesSet = new Set(phase)
//     const result: string[] = []
//     tasks.forEach((x) => {
//         if (x.PreferredPhases.includes('-') && x.PreferredPhases.includes('[')) return
//         if (x.PreferredPhases.includes('-')) {
//             const index = x.PreferredPhases.split('-').map(x => x.trim())
//             const PreferredPhases = []
//             for (let i = parseInt(index[0]); i <= parseInt(index[1]); i++) {
//                 PreferredPhases.push(i.toString())
//             }
//             console.log('genrrated from index', PreferredPhases)
//             if (PreferredPhases.filter(value => phasesSet.has(value)).length > 0) {
//                 result.push(x.TaskID)
//             }
//         } else if (x.PreferredPhases.includes('[')) {
//             const PreferredPhases = x.PreferredPhases.slice(1, -1).split(',').map(x => x.trim())
//             console.log('Parsed from steps', PreferredPhases)
//             if (PreferredPhases.filter(value => phasesSet.has(value)).length > 0) {
//                 result.push(x.TaskID)
//             }

//         }
//     })
//     return result

// }

// export const PhaseRule = () => {
//     const setRules = useDataStore(s => s.setRules)
//     const [phases, setPhases] = useState<string>('')
//     const tasks = useDataStore(s => s.tasks)
//     const [currRule ,  setCurrRule] = useState<{type:string,tasks:string[]} | null>( null)

//     useEffect(() => {
//         if (phases == '') return
//         if (phases.includes('-')) {
//             const index = phases.split('-').map(x => x.trim())
//             if (index[0] == '' || index[1] == '' || index.length !== 2) return
//             const phases_transformed: string[] = []
//             for (let i = parseInt(index[0]); i <= parseInt(index[1]); i++) {
//                 phases_transformed.push(i.toString())
//             }
//             setCurrRule({
//                 type: 'phaseWindow',
//                 tasks: PhaseRuleHelper(tasks, phases_transformed)
//             })
//             console.log('Generated from index', phases_transformed)


//         } else {
//             setCurrRule({
//                 type: 'phaseWindow',
//                 tasks: PhaseRuleHelper(tasks, phases.split(',').map(x => x.trim()))
//             })

//         }


//     }, [phases , tasks])
//     return (
//         <>
//             <div className="flex  justify-start items-center gap-5 my-2">
//                 <Label className="text-xs">Enter Phase</Label>
//                 <Input className="w-24" placeholder='1-2 or 1,2' value={phases} onChange={(e) => {
//                     setPhases(e.target.value)
//                 }} />

//             </div>
//             <Label><p className="font-bold">Tasks:</p> <p className="text-muted-foreground">{currRule ? currRule.tasks.join(', ') : "Please enter a valid Phase"}</p></Label>
//             <Button className="mt-4 w-full" onClick={() => {
//                 if(!currRule || currRule=='')return
//                 setRules((rules)=>[...rules,currRule])
//                 setCurrRule(null)
//             }}>Create Rule</Button>
//         </>
//     )
// }


// export const CurrentRules = memo(() => {
//     const rules = useDataStore(s => s.Rules)
//     return (
//         <div className=" gap-2 col-span-1 h-full m-3 ">
//             {rules ? rules.map((rule, index) => (
//                 <div key={index} className="border p-2 rounded-md">
//                    <p className="text-sm font-bold">Rule {index + 1}:</p>
//                     <p className="text-xs text-muted-foreground">Type: {JSON.stringify(rule)}</p>
                   
                 
//                 </div>
//             ))   : "No rules created yet"}
//         </div>
//     )
// })
