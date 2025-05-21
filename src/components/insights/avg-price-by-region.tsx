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

export type PriceByRegion = {
    _id: string;
    averagePrice: string;
};

const tooltipFormatter = (value: string, name: string) => {
    if (name === 'Avg Price') {
        return [`₹${Number.parseFloat(value).toFixed(2)}`, name];
    }
    return [value, name];
};

export const AvgPriceByRegionChart = ({ data }: { data: PriceByRegion[] }) => {
    const chartData = data.map((item) => ({
        ...item,
        averagePrice: Number.parseFloat(item.averagePrice),
    }));

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="region"
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                        height={80}
                    />
                    <YAxis />
                    <Tooltip formatter={tooltipFormatter} />
                    <Legend />
                    <Bar
                        dataKey="averagePrice"
                        fill="#82ca9d"
                        name="Avg Price"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
