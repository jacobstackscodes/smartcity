'use client';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export type PriceVsCrimeData = {
    region: string;
    averagePrice: number;
    crimeCount: number;
};

export const PriceVsCrimeChart = ({ data }: { data: PriceVsCrimeData[] }) => (
    <div className="h-[500px] w-full">
        <ResponsiveContainer>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="region"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={100}
                />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                    yAxisId="left"
                    dataKey="averagePrice"
                    fill="#82ca9d"
                    name="Avg Price"
                />
                <Bar
                    yAxisId="right"
                    dataKey="crimeCount"
                    fill="#ff7f50"
                    name="Crime Count"
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
);
