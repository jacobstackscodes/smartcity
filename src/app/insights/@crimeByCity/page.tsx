import { CrimeByCity, CrimeCountByCityChart } from "@/components/insights/crime-by-city";
import axios from "axios";

export default async function Page() {
    const { data } = await axios.get<CrimeByCity[]>('http://localhost:3000/api/insights/{route-name}');

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <CrimeCountByCityChart data={data} />;
}