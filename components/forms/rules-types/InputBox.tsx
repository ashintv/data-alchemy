import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

export function InputBox({
	label,
	value,
	setValue,
	error,
	placeholder,
	className,
}: InputBoxProps) {
	return (
		<div className="flex gap-2 items-center w-full">
			<Label>{label}</Label>
			<div className="flex flex-col w-full">
				<Input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					type="text"
					placeholder={placeholder}
					className={clsx(
						"border rounded-md p-2 w-full",
						error && "border-red-500",
						className // external styles
					)}
				/>
                <span className="text-red-500 text-xs">{error}</span>
			</div>
		</div>
	);
}

interface InputBoxProps {
	placeholder: string;
	label: string;
	value: string;
	setValue: (value: string) => void;
	error?: string | null;
	className?: string;
}
