import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Insights',
};

export default async function Layout({
    availabilityCrime,
    crimePrice,
    crimeType,
    sizeCrime,
}: {
    availabilityCrime: React.ReactNode;
    crimePrice: React.ReactNode;
    crimeType: React.ReactNode;
    sizeCrime: React.ReactNode;
}) {
    return (
        <div className="wrapper min-h-screen border-x border-border bg-white pt-16">
            <main className="w-full py-8">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold">
                        Availability vs Crime
                    </h2>
                    {availabilityCrime}
                </div>
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold">Crime vs Price</h2>
                    {crimePrice}
                </div>
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold">
                        Crime Type vs Property
                    </h2>
                    {crimeType}
                </div>
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold">Size vs Crime</h2>
                    {sizeCrime}
                </div>
            </main>
        </div>
    );
}
