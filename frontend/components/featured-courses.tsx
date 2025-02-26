"use client"

import { useState } from "react"
import { CourseCard } from "@/components/course-card"
import { CourseCarousel } from "@/components/course-carousel"
import { CourseSearch } from "@/components/course-search"

const allCourses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description: "Master full-stack web development",
    image: "/course-web-dev.jpg",
    category: "Programming",
    price: 99.99,
    featured: true,
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Learn the basics of data analysis",
    image: "/course-data-science.jpg",
    category: "Data",
    price: 89.99,
    featured: true,
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "Boost your online marketing skills",
    image: "/course-marketing.jpg",
    category: "Marketing",
    price: 79.99,
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Create iOS and Android apps",
    image: "/course-mobile-dev.jpg",
    category: "Programming",
    price: 94.99,
  },
  {
    id: 5,
    title: "Machine Learning Essentials",
    description: "Dive into AI and machine learning",
    image: "/course-ml.jpg",
    category: "Data",
    price: 109.99,
    featured: true,
  },
]

export function FeaturedCourses() {
  const [filteredCourses, setFilteredCourses] = useState(allCourses)

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    const filtered = allCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery) ||
        course.category.toLowerCase().includes(lowercaseQuery),
    )
    setFilteredCourses(filtered)
  }

  const featuredCourses = allCourses.filter((course) => course.featured)

  return (
    <section className="py-20 sm:py-32">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Featured Courses
        </h2>
        <CourseCarousel courses={featuredCourses} />
        <div className="mt-12 flex justify-center">
          <CourseSearch onSearch={handleSearch} />
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}

