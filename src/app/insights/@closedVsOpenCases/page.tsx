import {
    CaseStatusChart,
    type CaseStatusData,
} from '@/components/insights/closed-vs-open-cases';
import { req } from '@/lib/requests';

export default async function Page() {
    const { data } = await req.get<CaseStatusData[]>(
        '/api/insights/closed-vs-open-cases',
    );

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <CaseStatusChart data={data} />;
}
