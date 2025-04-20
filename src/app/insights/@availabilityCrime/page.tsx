import {
    AvailabilityCrimeChart,
    type AvailabilityCrimeData,
} from '@/components/insights/availability-crime';
import axios from 'axios';

export default async function Page() {
    const { data } = await axios.get<AvailabilityCrimeData[]>(
        'http://localhost:3000/api/insights/availability-vs-crime',
    );

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <AvailabilityCrimeChart data={data} />;
}
