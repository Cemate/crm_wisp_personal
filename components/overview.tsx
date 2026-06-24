"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Ene",
    total: 10800,
  },
  {
    name: "Feb",
    total: 11200,
  },
  {
    name: "Mar",
    total: 12450,
  },
  {
    name: "Abr",
    total: 0,
  },
  {
    name: "May",
    total: 0,
  },
  {
    name: "Jun",
    total: 0,
  },
  {
    name: "Jul",
    total: 0,
  },
  {
    name: "Ago",
    total: 0,
  },
  {
    name: "Sep",
    total: 0,
  },
  {
    name: "Oct",
    total: 0,
  },
  {
    name: "Nov",
    total: 0,
  },
  {
    name: "Dic",
    total: 0,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Ingresos"]} labelFormatter={(label) => `Mes: ${label}`} />
        <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
