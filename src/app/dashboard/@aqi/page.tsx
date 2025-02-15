import { AQIData } from '@/components/dashboard/aqi-data';

export default async function Page() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return <AQIData />;
}
