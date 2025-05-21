import {
    AvgPriceByRegionChart,
    type PriceByRegion,
} from '@/components/insights/avg-price-by-region';
import { req } from '@/lib/requests';

export default async function Page() {
    const { data } = await req.get<PriceByRegion[]>(
        '/api/insights/avg-price-by-region',
    );

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <AvgPriceByRegionChart data={data} />;
}
