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

export function CrimeTypeChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/insights/crimetype-vs-property')
            .then((res) => res.json())
            .then(setData);
    }, []);

    return (
        <div className="rounded-xl bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-semibold">
                Crime Type vs Property Type
            </h2>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <XAxis dataKey="propertyType" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Theft" stackId="a" fill="#8884d8" />
                    <Bar dataKey="Assault" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="Fraud" stackId="a" fill="#ffc658" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
