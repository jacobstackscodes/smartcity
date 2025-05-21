import {
    type CrimeByCity,
    CrimeCountByCityChart,
} from '@/components/insights/crime-by-city';
import { baseUrl } from '@/lib/utils';

export default async function Page() {
    const response = await fetch(baseUrl('/api/insights/count-by-city'), {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = (await response.json()) as CrimeByCity[];

    return <CrimeCountByCityChart data={data} />;
}
