"use client"

import { useState, useEffect, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, StarHalf, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Web Developer",
    content:
      "The Web Development Bootcamp was exactly what I needed to transition into tech. The instructors are incredibly knowledgeable and the community support is amazing. I landed a job within 2 months of completing the course!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    company: "TechCorp Inc.",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Data Analyst",
    content:
      "Data Science Fundamentals gave me the skills to excel in my career. The hands-on projects were challenging but incredibly rewarding. The instructors are top-notch and always available to help when needed.",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 4.5,
    company: "DataDrive Analytics",
  },
  {
    id: 3,
    name: "Carol Williams",
    role: "Marketing Manager",
    content:
      "Digital Marketing Mastery transformed my approach to online campaigns. It's a game-changer! The strategies I learned helped me increase our company's social media engagement by 200% in just three months.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5,
    company: "GrowthGenius Marketing",
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
      }, 30)

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
      className={`rounded-xl bg-white shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700 transition-all duration-1000 overflow-hidden transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="p-8 relative">
        <Quote className="absolute top-6 right-6 h-10 w-10 text-blue-100 dark:text-blue-900/50" />

        <div className="mb-6 flex items-center">
          <Avatar className="h-14 w-14 rounded-full border-2 border-primary">
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
            <p className="text-xs text-blue-600 dark:text-blue-400">{testimonial.company}</p>
          </div>
        </div>

        <StarRating rating={testimonial.rating} />

        <blockquote className="mt-4 text-gray-700 dark:text-gray-300 min-h-[120px]">
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
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">What Our Students Say</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Hear from our community of learners who have transformed their careers with LearnHub
          </p>
        </div>

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

