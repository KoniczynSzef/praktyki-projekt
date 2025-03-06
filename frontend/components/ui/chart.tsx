import type React from "react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer }

interface BarChartProps {
  data: any[]
  margin?: { top?: number; right?: number; left?: number; bottom?: number }
  children: React.ReactNode
}

export const BarChart = ({ data, margin, children }: BarChartProps) => {
  return (
    <RechartsBarChart data={data} margin={margin}>
      {children}
    </RechartsBarChart>
  )
}

