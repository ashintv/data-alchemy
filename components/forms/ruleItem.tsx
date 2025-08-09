import { Card } from "../ui/card";

export function RuleItem({ icon, description, Name, onClick }: RuleItemProps) {
	return (
		<Card onClick={onClick} className="p-4 hover:bg-muted hover:cursor-pointer gap-0 hover:-translate-0.5 hover:shadow-xl/10  ">
			<h2 className="text-lg flex gap-2 font-bold items-center">
				{icon} {Name}
			</h2>
			<p className="text-sm">{description}</p>
		</Card>
	);
}
interface RuleItemProps {
	icon: any;
	description: string;
	Name: string;
    onClick: () => void;
}
