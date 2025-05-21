import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type PriceByRegion = {
    _id: string;
    avgPrice: number;
};

export const AvgPriceByRegionChart = ({ data }: { data: PriceByRegion[] }) => (
    <div className="h-[400px] w-full">
        <ResponsiveContainer>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" angle={-30} textAnchor="end" interval={0} height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgPrice" fill="#82ca9d" name="Avg Price" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);