import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type CaseStatusData = {
    _id: string;
    count: number;
};

export const CaseStatusChart = ({ data }: { data: CaseStatusData[] }) => (
    <div className="h-[400px] w-full">
        <ResponsiveContainer>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Cases" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);