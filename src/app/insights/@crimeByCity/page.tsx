import {
    type CrimeByCity,
    CrimeCountByCityChart,
} from '@/components/insights/crime-by-city';
import { req } from '@/lib/requests';

export default async function Page() {
    const { data } = await req.get<CrimeByCity[]>(
        '/api/insights/count-by-city',
    );

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <CrimeCountByCityChart data={data} />;
}
