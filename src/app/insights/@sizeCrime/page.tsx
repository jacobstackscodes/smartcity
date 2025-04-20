import {
    SizeCrimeChart,
    SizeCrimeData,
} from '@/components/insights/size-crime';
import axios from 'axios';

export default async function Page() {
    const { data } = await axios.get<SizeCrimeData[]>(
        'http://localhost:3000/api/insights/size-vs-crime',
    );

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <SizeCrimeChart data={data} />;
}
