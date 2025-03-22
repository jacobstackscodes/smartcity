"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, LineChart, Line } from "recharts";

interface ChartWrapperProps {
  type: "bar" | "scatter" | "line";
  data: any[];
  xKey: string;
  yKeys: { key: string; color: string; label: string }[];
  width?: number;
  height?: number;
}

export default function ChartWrapper({ type, data, xKey, yKeys, width = 600, height = 400 }: ChartWrapperProps) {
  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {yKeys.map((y) => (
            <Bar key={y.key} dataKey={y.key} fill={y.color} name={y.label} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  } else if (type === "scatter") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart>
          <XAxis dataKey={xKey} />
          <YAxis dataKey={yKeys[0].key} />
          <Tooltip />
          <Legend />
          <Scatter data={data} fill={yKeys[0].color} name={yKeys[0].label} />
        </ScatterChart>
      </ResponsiveContainer>
    );
  } else if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {yKeys.map((y) => (
            <Line key={y.key} type="monotone" dataKey={y.key} stroke={y.color} name={y.label} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }
  return null;
}