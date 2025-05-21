import {
    type CrimeAgeBucket,
    CrimeByAgeGroupChart,
} from '@/components/insights/crime-by-age';
import { req } from '@/lib/requests';

export default async function Page() {
    const { data } = await req.get<CrimeAgeBucket[]>(
        '/api/insights/crime-by-age',
    );

    if (!data || data.length === 0)
        throw new Error('No data available for the chart');

    return <CrimeByAgeGroupChart data={data} />;
}
