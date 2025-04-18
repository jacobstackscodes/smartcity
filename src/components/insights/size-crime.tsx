'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';

export function SizeCrimeChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/insights/size-vs-crime')
            .then((res) => res.json())
            .then(setData);
    }, []);

    return (
        <div className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">
                Property Size vs Crime Rate
            </h2>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <XAxis dataKey="size" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="crimeCount"
                        fill="#ff6961"
                        name="Crime Reports"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
