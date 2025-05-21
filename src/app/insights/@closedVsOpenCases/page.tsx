import { CaseStatusChart, CaseStatusData } from "@/components/insights/closed-vs-open-cases";
import axios from "axios";

export default async function Page() {
    const { data } = await axios.get<CaseStatusData[]>('http://localhost:3000/api/insights/{route-name}');

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <CaseStatusChart data={data} />;
}