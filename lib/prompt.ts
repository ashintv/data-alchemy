const schema = `
Data Entity Explanation
------------------------

clients.csv
-----------
ClientID, ClientName, PriorityLevel, RequestedTaskIDs, GroupTag, AttributesJSON

- PriorityLevel: integer (1–5)
- RequestedTaskIDs: comma-separated TaskIDs
- AttributesJSON: arbitrary JSON metadata

workers.csv
-----------
WorkerID, WorkerName, Skills, AvailableSlots, MaxLoadPerPhase, WorkerGroup, QualificationLevel

- Skills: comma-separated tags
- AvailableSlots: array of phase numbers (e.g. [1, 3, 5])
- MaxLoadPerPhase: integer

tasks.csv
---------
TaskID, TaskName, Category, Duration, RequiredSkills, PreferredPhases, MaxConcurrent

- Duration: number of phases (≥1)
- RequiredSkills: comma-separated tags
- PreferredPhases: list or range syntax (e.g. "1-3" or [2, 4, 5])
- MaxConcurrent: integer (max parallel assignments)


Entity Explanation
------------------
Clients represent people or groups requesting work.
- Provide RequestedTaskIDs and PriorityLevel to indicate importance.
- Ingestion must check:
  * Every requested task exists.
  * Higher-priority clients can be identified.

Tasks define units of work.
- Duration must be valid.
- RequiredSkills must match worker capabilities.
- PreferredPhases must be parsed and normalized.

Workers supply capacity to perform tasks.
- Skills must cover required tasks.
- AvailableSlots must be valid numbers.
- Load limits must be enforceable.


Data Relationships & Correlations
----------------------------------
Clients → Tasks:
- Each RequestedTaskIDs entry must match valid TaskIDs in tasks.csv.

Tasks → Workers:
- Every skill in RequiredSkills must appear in at least one worker’s Skills.

Workers → Phases:
- AvailableSlots define which phases a worker can serve.

Group Tags:
- GroupTag in clients and WorkerGroup in workers link slot-restriction and load-limit rules.

PriorityLevel Impact:
- 1–5 scale; higher priority satisfied first.

PreferredPhases:
- May be ranges ("2-4") or lists ([1, 3, 5]); normalize to explicit phase arrays.

These connections guide cross-reference validations and help anticipate complex checks like:
- Circular co-runs
- Phase-slot saturation
`;

const exampleRules = `


[
    {
        "id": "rule-1754928448648",
        "name": "asd",
        "workerGroupId": "GroupA",
        "type": "loadLimit",
        "maxSlotsPerPhase": 12
    },
    {
        "id": "1754928437881",
        "name": "asdasd",
        "type": "slotRestriction",
        "groupType": "ClientGroup",
        "groupId": "GroupA",
        "minCommonSlots": 2
    },
    {
        "id": "rule-1754928427614",
        "name": "HEllo",
        "type": "coRun",
        "tasks": [
            "T1",
            "T2"
        ]
    },
    {
        "id": "1754924550861",
        "name": "Rule 1754924550861",
        "type": "slotRestriction",
        "groupType": "WorkerGroup",
        "groupId": "GroupA",
        "minCommonSlots": 1
    },
    {
        "id": "rule-1754921368844",
        "name": "asd",
        "workerGroupId": "GroupA",
        "type": "loadLimit",
        "maxSlotsPerPhase": 3
    },
    {
        "id": "rule-1754920916574",
        "name": "asdasd",
        "workerGroupId": "GroupA",
        "type": "loadLimit",
        "maxSlotsPerPhase": 3
    },
    {
        "id": "rule-1754920856506",
        "name": "asd",
        "type": "coRun",
        "tasks": [
            "T1",
            "T2",
            "T3",
            "T4",
            "T5"
        ]
    }
]

The system should:
1. Provide an intuitive UI for creating rules of types:
   - coRun
   - slotRestriction
   - loadLimit
   - phaseWindow
   - patternMatch
   - precedenceOverride
2. Let the user review the list of rules.
3. On clicking "Generate Rules Config", export the current rules list to a clean rule.json file.
4. Ensure all data matches the schema and is valid.
`;


const exampleResponse = `

    {
      "id": "R1",
      "name": "Run Tasks Together",
      "description": "Run T1 and T2 together",
      "priority": 1,
      "type": "coRun",
      "parameters": {
        "tasks": ["T1", "T2"]
      }
    },
    {
      "id": "R2",
      "name": "Slot Restriction Rule",
      "priority": 2,
      "type": "slotRestriction",
      "parameters": {
        "slot": 3,
        "tasks": ["T4", "T5"]
      }
    },
    {
      "id": "R3",
      "name": "Exclusive Group Rule",
      "priority": 3,
      "type": "exclusiveGroup",
      "parameters": {
        "group": "G1",
        "tasks": ["T6", "T7"]
      }
    }
  `


const exampleData = `
clients.csv
ClientID,ClientName,PriorityLevel,RequestedTaskIDs,GroupTag,AttributesJSON
C1,Acme Corp,3,T17,T27,T33,T31,T20,T3,T32,T26,GroupA,"{\"location\":\"New York\",\"industry\":\"Finance\"}"
C2,Globex Inc,4,T12,T19,T4,T15,T7,GroupB,"{\"location\":\"London\",\"industry\":\"Tech\"}"
C3,Initech,2,T1,T6,T8,T10,GroupC,"{\"location\":\"Berlin\",\"industry\":\"Software\"}"
C4,Hooli,5,T2,T9,T11,T14,GroupA,"{\"location\":\"San Francisco\",\"industry\":\"Media\"}"
C5,Stark Industries,1,T13,T17,T5,T28,GroupB,"{\"location\":\"Los Angeles\",\"industry\":\"Defense\"}"
C6,Wayne Enterprises,4,T18,T23,T21,T19,GroupC,"{\"location\":\"Gotham\",\"industry\":\"Manufacturing\"}"
C7,Wonka Factory,3,T7,T3,T14,T9,GroupA,"{\"location\":\"Zurich\",\"industry\":\"Food\"}"
C8,Tyrell Corp,2,T2,T6,T8,T4,GroupB,"{\"location\":\"Tokyo\",\"industry\":\"Biotech\"}"
C9,Oscorp,5,T1,T5,T12,T15,GroupC,"{\"location\":\"Paris\",\"industry\":\"Chemicals\"}"
C10,Cyberdyne Systems,1,T3,T7,T9,T2,GroupA,"{\"location\":\"Seoul\",\"industry\":\"Robotics\"}"
C11,Gringotts Bank,3,T8,T19,T21,T4,GroupB,"{\"location\":\"London\",\"industry\":\"Banking\"}"
C12,Acme Widgets,4,T5,T6,T8,T12,GroupC,"{\"location\":\"Sydney\",\"industry\":\"Retail\"}"
C13,Monarch Solutions,2,T1,T3,T9,T17,GroupA,"{\"location\":\"Moscow\",\"industry\":\"Energy\"}"
C14,Aperture Science,5,T11,T15,T19,T23,GroupB,"{\"location\":\"Detroit\",\"industry\":\"Research\"}"
C15,Black Mesa,1,T4,T6,T8,T13,GroupC,"{\"location\":\"Las Vegas\",\"industry\":\"Science\"}"

workers.csv
WorkerID,WorkerName,Skills,AvailableSlots,MaxLoadPerPhase,WorkerGroup,QualificationLevel
W1,John Doe,Python,SQL,3,5,GroupX,Senior
W2,Jane Smith,JavaScript,HTML,CSS,2,4,GroupY,Mid
W3,Bob Lee,Java,C++,4,6,GroupZ,Senior
W4,Alice Wong,R,Statistics,DataViz,1,3,GroupX,Junior
W5,Tom Brown,Go,Rust,3,5,GroupY,Mid
W6,Susan White,Python,ML,AI,4,6,GroupZ,Senior
W7,Peter Parker,Photography,WebDesign,2,3,GroupX,Junior
W8,Bruce Wayne,Leadership,Strategy,Security,5,8,GroupY,Senior
W9,Clark Kent,Writing,Editing,Media,2,4,GroupZ,Mid
W10,Diana Prince,Negotiation,Research,Policy,3,5,GroupX,Senior
W11,Barry Allen,Networking,Hardware,2,3,GroupY,Mid
W12,Hal Jordan,UIUX,Prototyping,2,4,GroupZ,Junior
W13,Arthur Curry,Diving,MarineTech,3,5,GroupX,Mid
W14,Victor Stone,Cybersecurity,Cloud,5,7,GroupY,Senior
W15,Selina Kyle,Agile,Testing,QA,2,4,GroupZ,Mid
`;

export const System_PROMPT = `You are a helpful assistant in a software  that helps to generate json rules from a user input on schema . the schema is as follows : ${schema}
    some of the example data and rules are given : 
            rules : ${exampleRules}
            data : ${exampleData}


    Note - create a new type of rule if and only if it cannot be created in the existing types.
    Note - you can use the existing data and rules as a reference to create new rules.
    Note  - if you created a new type attch it to ai rules 

    IMPORTENT : return only json data for the rule which can be parsed using json.PARSE without any styling (no line breaks or indentation)

    example response : ${exampleResponse}
        


    `;

import { Type } from "@google/genai";

// export const rulesResponseSchema =