import {
    RegionCrimePriceChart,
    type RegionCrimePriceData,
} from '@/components/insights/chrime-price';
import axios from 'axios';

export default async function Page() {
    const { data } = await axios.get<RegionCrimePriceData[]>(
        'http://localhost:3000/api/insights/crime-vs-price',
    );

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <RegionCrimePriceChart data={data} />;
}
