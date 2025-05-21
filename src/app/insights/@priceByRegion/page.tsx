import {
    AvgPriceByRegionChart,
    type PriceByRegion,
} from '@/components/insights/avg-price-by-region';
import { baseUrl } from '@/lib/utils';

export default async function Page() {
    const response = await fetch(baseUrl('/api/insights/avg-price-by-region'));

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = (await response.json()) as PriceByRegion[];

    return <AvgPriceByRegionChart data={data} />;
}
