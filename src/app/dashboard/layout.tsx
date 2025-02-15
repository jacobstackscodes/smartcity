import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

type Props = {
    aqi: React.ReactNode;
    category: React.ReactNode;
};

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function Layout({ aqi, category }: Props) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 divide-x divide-border border-t border-border">
                            <div className="flex flex-col gap-2 p-4">
                                <h5 className="leading-none font-semibold">
                                    AQI
                                </h5>
                                {aqi}
                            </div>
                            <div className="flex flex-col gap-2 p-4">
                                <h5 className="leading-none font-semibold">
                                    Category
                                </h5>
                                {category}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle></CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
