import { PriceVsCrimeChart, PriceVsCrimeData } from "@/components/insights/price-vs-crime-by-region";
import axios from "axios";

export default async function Page() {
    const { data } = await axios.get<PriceVsCrimeData[]>('http://localhost:3000/api/insights/price-vs-crime');

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <PriceVsCrimeChart data={data} />;
}