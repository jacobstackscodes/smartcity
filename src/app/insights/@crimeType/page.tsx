import {
    CrimeTypeChart,
    type CrimeTypeData,
} from '@/components/insights/crime-type';
import axios from 'axios';

export default async function Page() {
    const { data } = await axios.get<CrimeTypeData[]>(
        'http://localhost:3000/api/insights/crimetype-vs-property',
    );

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <CrimeTypeChart data={data} />;
}
