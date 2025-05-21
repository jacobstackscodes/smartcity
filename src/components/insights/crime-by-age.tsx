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

export type CrimeAgeBucket = {
    _id: string;
    count: number;
};

export const CrimeByAgeGroupChart = ({ data }: { data: CrimeAgeBucket[] }) => (
    <div className="h-[400px] w-full">
        <ResponsiveContainer>
            <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ff7300" name="Crime Reports" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);
