"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface TimelineItem {
  year: string
  title: string
  description: string
  image: string
}

interface TimelineProps {
  items: TimelineItem[]
}

function TimelineItemComponent({ item, index }: { item: TimelineItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`mb-8 flex justify-between items-center w-full ${
        index % 2 === 0 ? "flex-row-reverse" : ""
      } transition-all duration-500 ease-in-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center justify-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{item.year}</h1>
      </div>
      <div className="order-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-3 font-bold text-gray-800 dark:text-white text-xl">{item.title}</h3>
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        <p className="text-sm leading-snug tracking-wide text-gray-600 dark:text-gray-300">{item.description}</p>
      </div>
    </div>
  )
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
      {items.map((item, index) => (
        <TimelineItemComponent key={index} item={item} index={index} />
      ))}
    </div>
  )
}

