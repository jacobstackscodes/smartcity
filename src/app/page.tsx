import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Home',
};

export default function Home() {
    return (
        <>
            <main className="relative h-auto w-full divide-y divide-gray-300 bg-gray-100">
                <section className="relative flex h-dvh w-full overflow-hidden bg-[url('/wallpaper.webp')] bg-cover bg-center text-white before:absolute before:top-0 before:left-0 before:z-0 before:size-full before:bg-gray-700/75 before:content-['']">
                    <div className="relative z-1 m-auto max-w-xl text-center">
                        <div className="space-y-8">
                            <h2 className="mb-8 text-5xl font-bold">
                                Smart City Dashboard
                            </h2>
                            <p>
                                Real-time analytics for traffic, air quality,
                                and crime data in Bangalore. Empowering citizens
                                with data-driven insights.
                            </p>
                        </div>
                        <Link
                            className="mt-16 inline-flex gap-2 rounded-full bg-blue-500 px-6 py-2.5 transition-[background] duration-300 hover:bg-blue-600"
                            href="/dashboard"
                        >
                            <span>Explore Dashboard</span>
                            <i className="ri-arrow-right-s-line"></i>
                        </Link>
                    </div>
                </section>
                <section className="py-18">
                    <h2 className="mb-10 text-center text-5xl">About Us</h2>
                    <div className="wrapper">
                        <p className="text-center">
                            The Smart City Dashboard is designed to provide
                            citizens and city planners with critical data
                            insights. By combining real-time APIs and historical
                            data, this tool empowers better decision-making and
                            fosters a safer, healthier, and more efficient urban
                            environment.
                        </p>
                    </div>
                </section>
                <section className="py-18">
                    <h2 className="mb-10 text-center text-5xl">Features</h2>
                    <div className="wrapper grid grid-cols-3 gap-5">
                        <Card className="rounded-lg text-center">
                            <CardHeader>
                                <CardTitle className="text-blue-500">
                                    Live Traffic Updates
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-4">
                                Monitor real-time traffic conditions with
                                interactive maps and congestion alerts.
                            </CardContent>
                        </Card>
                        <Card className="rounded-lg text-center">
                            <CardHeader>
                                <CardTitle className="text-blue-500">
                                    Air Quality Index
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-4">
                                Stay informed about the air you breathe with
                                up-to-date AQI data and trends.
                            </CardContent>
                        </Card>
                        <Card className="rounded-lg text-center">
                            <CardHeader>
                                <CardTitle className="text-blue-500">
                                    Crime Data Visualization
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-4">
                                Analyze historical crime rates to identify safe
                                and high-risk areas in the city.
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
            <footer className="border-t border-gray-400 py-4">
                <div className="wrapper">
                    <p>
                        &copy; 2025 Smart City Dashboard. All Rights Reserved.
                        Created by Nathanael D&apos;Cunha
                    </p>
                </div>
            </footer>
        </>
    );
}
