"use client"

import { useState, useEffect, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, StarHalf } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Web Developer",
    content: "The Web Development Bootcamp was exactly what I needed to transition into tech. Highly recommended!",
    avatar: "/avatar-1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Data Analyst",
    content: "Data Science Fundamentals gave me the skills to excel in my career. The instructors are top-notch!",
    avatar: "/avatar-2.jpg",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Carol Williams",
    role: "Marketing Manager",
    content: "Digital Marketing Mastery transformed my approach to online campaigns. It's a game-changer!",
    avatar: "/avatar-3.jpg",
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
    </div>
  )
}

function TypewriterEffect({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 50)

      return () => clearTimeout(timeout)
    } else {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return <span>{displayText}</span>
}

function TestimonialCard({
  testimonial,
  isVisible,
  onComplete,
  delay,
}: { testimonial: (typeof testimonials)[0]; isVisible: boolean; onComplete: () => void; delay: number }) {
  const [show, setShow] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShow(true), delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, delay])

  const handleTypingComplete = useCallback(() => {
    setTypingComplete(true)
    onComplete()
  }, [onComplete])

  return (
    <div
      className={`rounded-lg bg-white shadow-md dark:bg-gray-800 transition-all duration-1000 overflow-hidden ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <Avatar className="h-12 w-12 rounded-full border-2 border-primary">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
        <blockquote className="mt-4 border-l-4 border-blue-500 pl-4 text-gray-700 dark:text-gray-300">
          {show && !typingComplete && (
            <>
              "<TypewriterEffect text={testimonial.content} onComplete={handleTypingComplete} />"
            </>
          )}
          {show && typingComplete && `"${testimonial.content}"`}
        </blockquote>
      </div>
    </div>
  )
}

export function Testimonials() {
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([])

  const handleTestimonialComplete = useCallback((index: number) => {
    if (index < testimonials.length - 1) {
      setVisibleTestimonials((prev) => {
        if (!prev.includes(index + 1)) {
          return [...prev, index + 1]
        }
        return prev
      })
    }
  }, [])

  useEffect(() => {
    setVisibleTestimonials([0]) // Show the first testimonial on mount
  }, [])

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-800 dark:to-indigo-800 py-20 sm:py-32">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What Our Students Say
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isVisible={visibleTestimonials.includes(index)}
              onComplete={() => handleTestimonialComplete(index)}
              delay={index * 500}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

