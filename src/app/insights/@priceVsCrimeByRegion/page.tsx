import {
    PriceVsCrimeChart,
    type PriceVsCrimeData,
} from '@/components/insights/price-vs-crime-by-region';
import { req } from '@/lib/requests';

export default async function Page() {
    const { data } = await req.get<PriceVsCrimeData[]>(
        '/api/insights/price-vs-crime',
    );

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <PriceVsCrimeChart data={data} />;
}
