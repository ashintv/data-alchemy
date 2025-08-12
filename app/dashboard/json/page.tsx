'use client'
import { EditableJsonTable } from "@/components/jsonTotable";

export default function JsonPage() {
    const sampleJson = {
        name: "Example Rule",
        type: "slotRestriction",
        slots: [1, 2, 3],
        description:
            "This is a long description text that might need a textarea for editing.",
        nested: {
            key1: "value1",
            key2: "value2",
        },
    };
	return (
		<div>
			<h1>JSON Data</h1>
			<EditableJsonTable
				data={sampleJson}
				onChange={(updated) => console.log("Updated JSON:", updated)}
			/>
		</div>
	);
}
