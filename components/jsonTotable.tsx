"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface JsonTableProps {
	data: any;
	onChange?: (updatedData: any) => void;
}

export const EditableJsonTable: React.FC<JsonTableProps> = ({
	data,
	onChange,
}) => {
	const [jsonData, setJsonData] = useState(data);

	const handleValueChange = (keyPath: string[], value: any) => {
		const updatedData = { ...jsonData };
		let current: any = updatedData;

		for (let i = 0; i < keyPath.length - 1; i++) {
			current = current[keyPath[i]];
		}

		const lastKey = keyPath[keyPath.length - 1];

		if (Array.isArray(current[lastKey])) {
			current[lastKey] = value.split(",").map((v: string) => v.trim());
		} else {
			try {
				current[lastKey] = JSON.parse(value);
			} catch {
				current[lastKey] = value;
			}
		}

		setJsonData(updatedData);
		onChange?.(updatedData);
	};

	const renderTable = (obj: any, path: string[] = []) => {
		return (
			<div className="border rounded-lg m-1 shadow-sm">
				<Table className="text-sm">
					<TableBody>
						{Object.entries(obj).map(([key, value]) => (
							<TableRow key={key} className="align-top">
								<TableCell className="font-medium text-red-600 w-36 py-1 px-2">
									{key}
								</TableCell>
								<TableCell className="py-1 px-2">
									{Array.isArray(value) ? (
										<Input
											value={value.join(", ")}
											onChange={(e) =>
												handleValueChange([...path, key], e.target.value)
											}
											className="w-full min-w-[150px] text-xs"
										/>
									) : typeof value === "object" && value !== null ? (
										renderTable(value, [...path, key])
									) : typeof value === "string" && value.length > 30 ? (
										<Textarea
											value={value}
											onChange={(e) =>
												handleValueChange([...path, key], e.target.value)
											}
											className="w-full min-w-[200px] text-xs"
											rows={2}
										/>
									) : (
										<Input
											value={String(value)}
											onChange={(e) =>
												handleValueChange([...path, key], e.target.value)
											}
											className="w-full min-w-[150px] text-xs"
										/>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	};

	return <div className="space-y-2">{renderTable(jsonData)}</div>;
};
