import {
    CaseStatusChart,
    type CaseStatusData,
} from '@/components/insights/closed-vs-open-cases';
import { baseUrl } from '@/lib/utils';

export default async function Page() {
    const response = await fetch(
        baseUrl('/api/insights/closed-vs-open-cases'),
        {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        },
    );

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = (await response.json()) as CaseStatusData[];

    return <CaseStatusChart data={data} />;
}
