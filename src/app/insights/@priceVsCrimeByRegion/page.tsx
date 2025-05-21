import {
    PriceVsCrimeChart,
    type PriceVsCrimeData,
} from '@/components/insights/price-vs-crime-by-region';
import { baseUrl } from '@/lib/utils';

export default async function Page() {
    const response = await fetch(baseUrl('/api/insights/price-vs-crime'), {
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

    const data = (await response.json()) as PriceVsCrimeData[];

    return <PriceVsCrimeChart data={data} />;
}
