"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Award, Globe } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"

// Sample data for the chart
const courseCompletionData = [
  { name: "Programming", completion: 85 },
  { name: "Business", completion: 75 },
  { name: "Design", completion: 90 },
  { name: "Marketing", completion: 65 },
  { name: "Data Science", completion: 80 },
]

const stats = [
  {
    icon: Users,
    value: 50000,
    label: "Active Students",
    color: "text-blue-500",
  },
  {
    icon: BookOpen,
    value: 300,
    label: "Courses",
    color: "text-green-500",
  },
  {
    icon: Award,
    value: 15000,
    label: "Certificates Issued",
    color: "text-purple-500",
  },
  {
    icon: Globe,
    value: 190,
    label: "Countries",
    color: "text-orange-500",
  },
]

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const currentCount = Math.floor(progress * end)

      if (currentCount !== countRef.current) {
        setCount(currentCount)
        countRef.current = currentCount
      }

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration, isVisible])

  return (
    <div ref={containerRef} className="flex items-center justify-center">
      <span>{count.toLocaleString()}</span>
      {end === 190 && <span className="ml-1">+</span>}
    </div>
  )
}

export function Statistics() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkTheme = theme === "dark"

  const chartColors = {
    primary: isDarkTheme ? "#7c86ff" : "#4f46e5",
    background: isDarkTheme ? "#1f2937" : "#f3f4f6",
    hoverBackground: isDarkTheme ? "rgba(124, 134, 255, 0.2)" : "rgba(79, 70, 229, 0.1)",
    text: isDarkTheme ? "#e5e7eb" : "#374151",
    grid: isDarkTheme ? "#374151" : "#d1d5db",
    tooltip: {
      background: isDarkTheme ? "rgba(31, 41, 55, 0.9)" : "rgba(255, 255, 255, 0.9)",
      text: isDarkTheme ? "#e5e7eb" : "#374151",
    },
  }

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Impact in Numbers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            LearnHub has helped thousands of students achieve their learning goals
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md dark:bg-gray-800">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className={`${stat.color} bg-opacity-10 p-3 rounded-full`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                  <CountUp end={stat.value} />
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`rounded-xl shadow-md p-6 ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}>
          <h3 className="text-xl font-semibold mb-6 text-center">Course Completion Rates by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="name" tick={{ fill: chartColors.text }} />
                <YAxis unit="%" tick={{ fill: chartColors.text }} />
                <Tooltip
                  formatter={(value) => [`Completion Rate ${value}%`]}
                  cursor={{ fill: chartColors.hoverBackground }}
                  contentStyle={{
                    backgroundColor: chartColors.tooltip.background,
                    color: chartColors.tooltip.text,
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                  labelStyle={{ color: chartColors.tooltip.text }}
                />
                <Bar dataKey="completion" fill={chartColors.primary} radius={[4, 4, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

