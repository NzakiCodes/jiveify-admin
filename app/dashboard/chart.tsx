"use client";

import { Description } from "@radix-ui/react-toast";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

/* const data = [
  {
    name: "Male",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Female",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]; */

export default function Chart({data}: {
  data: {
    name: string;
    total: number;
  }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
