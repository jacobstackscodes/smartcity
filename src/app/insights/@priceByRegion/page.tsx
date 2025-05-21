import { AvgPriceByRegionChart, PriceByRegion } from "@/components/insights/avg-price-by-region";
import axios from "axios";

export default async function Page() {
    const { data } = await axios.get<PriceByRegion[]>('http://localhost:3000/api/insights/avg-price-by-region');

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <AvgPriceByRegionChart data={data} />;
}