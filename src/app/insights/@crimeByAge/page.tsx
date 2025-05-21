import { CrimeAgeBucket, CrimeByAgeGroupChart } from "@/components/insights/crime-by-age";
import axios from "axios";

export default async function Page() {
    const { data } = await axios.get<CrimeAgeBucket[]>('http://localhost:3000/api/insights/crime-by-age');

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <CrimeByAgeGroupChart data={data} />;
}