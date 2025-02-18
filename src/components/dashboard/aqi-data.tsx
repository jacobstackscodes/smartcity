import { cn } from "@/lib/utils";

type Props = {
	data: {
		displayName: string;
		aqi: number;
		color: {
			red: number;
			green: number;
			blue: number;
		}
	}
}

export const AQIData = ({ data }: Props) => {
	const { displayName, aqi } = data;

	return (
		<div className={cn(
			"col-span-1 p-4 rounded-lg text-black/90 ring-inset ring-black/20 transition-[box-shadow] duration-300 hover:ring-4", 
			{
				'bg-aqi-good': aqi <= 50,
				'bg-aqi-moderate': aqi > 50 && aqi <= 100,
				'bg-aqi-sensitive': aqi > 100 && aqi <= 150,
				'bg-aqi-unhealthy': aqi > 150 && aqi <= 200,
				'bg-aqi-very-unhealthy': aqi > 200 && aqi <= 300,
				'bg-aqi-hazardous': aqi > 300,
				'text-white/90': aqi > 200
			}
		)}>
			<div className='flex flex-col gap-2 items-center'>
				<span className='text-xl/none font-semibold'>{aqi}</span>
				<span className='text-sm/none'>{displayName}</span>
			</div>
		</div>
	)
}