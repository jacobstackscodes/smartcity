import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Insights',
};

export default async function Layout({
    priceByRegion,
    closedVsOpenCases,
    crimeByAge,
    crimeByCity,
    priceVsCrimeByRegion
}: {
    priceByRegion: React.ReactNode;
    closedVsOpenCases: React.ReactNode;
    crimeByAge: React.ReactNode;
    crimeByCity: React.ReactNode;
    priceVsCrimeByRegion: React.ReactNode;
}) {
    return (
        <div className="wrapper min-h-screen border-x border-border bg-white pt-16">
            <main className="w-full py-8">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold">
                        Price by Region
                    </h2>
                    {priceByRegion}
                </div>
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold">Closed vs Open Cases</h2>
                    {closedVsOpenCases}
                </div>
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold">
                        Crime by Age Group
                    </h2>
                    {crimeByAge}
                </div>
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold">Crime by City</h2>
                    {crimeByCity}
                </div>
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold">Price vs Crime by Region</h2>
                    {priceVsCrimeByRegion}
                </div>
            </main>
        </div>
    );
}
