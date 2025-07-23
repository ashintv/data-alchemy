import { Download } from "../icons/download"
import { Button } from "../ui/button"
import { DownloadCSV } from "./download"

export function Heading({ value }: { value: string}) {
	return (
		<div className="flex justify-between items-center p-5">
			<h2 className="text-6xl md:text-5xl font-extrabold mb-6 text-center text-primary bg-clip-text ">
				{value}
			</h2>
			
		</div>
	)
}
