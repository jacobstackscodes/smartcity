import { AQIHeader } from '@/components/dashboard/aqi-header';
import { Search } from '@/components/dashboard/search';

type Props = {
    header: React.ReactNode;
    forecast: React.ReactNode;
    information: React.ReactNode;
};

export default function Layout({ header, forecast, information }: Props) {
    return (
        <>
            {header}
            <Search />
            <section className="space-y-8 py-8">
                {forecast}
                {information}
            </section>
        </>
    );
}
