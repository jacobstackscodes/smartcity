'use client';

import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { useEffect, useState } from 'react';

export function CrimePriceChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/insights/crime-vs-price')
            .then((res) => res.json())
            .then(setData);
    }, []);

    return (
        <div className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">
                Crime Rate vs Property Price
            </h2>
            <ResponsiveContainer width="100%" height={350}>
                <ScatterChart>
                    <CartesianGrid />
                    <XAxis dataKey="crimeCount" name="Crime Reports" />
                    <YAxis dataKey="averagePrice" name="Avg Price (Lacs)" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Areas" data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
