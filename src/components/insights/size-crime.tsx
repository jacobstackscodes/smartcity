'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
    Brush,
} from 'recharts';

export type SizeCrimeData = {
    size: string;
    totalProperties: number;
    crimeCount: number;
    avgZoneCrimeCount: number;
};

export const SizeCrimeChart = ({ data }: { data: SizeCrimeData[] }) => {
    return (
        <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="size"
                        angle={-20}
                        textAnchor="end"
                        interval={0}
                        height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="totalProperties"
                        name="Total Properties"
                        fill="#a8e6a1"
                    />
                    <Bar
                        dataKey="crimeCount"
                        name="Crime Count"
                        fill="#f8a5a5"
                    />
                    <Brush
                        dataKey="size"
                        height={30}
                        stroke="#8884d8"
                        startIndex={0}
                        endIndex={Math.min(10, data.length - 1)}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
