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

export type CrimeTypeData = {
    crimeType: string;
    count: number;
};

export const CrimeTypeChart = ({ data }: { data: CrimeTypeData[] }) => {
    return (
        <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 10, bottom: 80 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="crimeType"
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                        height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Crime Count" fill="#f8a5a5" />
                    <Brush
                        dataKey="crimeType"
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
