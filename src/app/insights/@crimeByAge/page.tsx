import {
    type CrimeAgeBucket,
    CrimeByAgeGroupChart,
} from '@/components/insights/crime-by-age';
import { baseUrl } from '@/lib/utils';

export default async function Page() {
    const response = await fetch(baseUrl('/api/insights/crime-by-age'), {
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

    const data = (await response.json()) as CrimeAgeBucket[];

    return <CrimeByAgeGroupChart data={data} />;
}
