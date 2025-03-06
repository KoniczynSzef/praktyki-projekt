import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Award } from "lucide-react"

// This would typically come from a database or API
const featuredCourses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description: "Master full-stack web development",
    category: "Programming",
    price: 99.99,
    featured: true,
    rank: 1,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Learn the basics of data analysis",
    category: "Data",
    price: 89.99,
    featured: true,
    rank: 2,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Machine Learning Essentials",
    description: "Dive into AI and machine learning",
    category: "Data",
    price: 109.99,
    featured: true,
    rank: 3,
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
]

function FeaturedCourseCard({ course, isTopRanked }: { course: Course; isTopRanked: boolean }) {
  return (
    <Card
      className={`flex flex-col h-full overflow-hidden ${isTopRanked ? "border-2 border-indigo-500 rounded-lg" : ""}`}
    >
      <div className="relative">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          width={600}
          height={300}
          className="w-full h-48 object-cover filter blur-[2px]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        {isTopRanked && (
          <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2 shadow-md">
            <Award className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
      <CardContent className="flex-grow p-6 relative z-10 bg-white dark:bg-gray-800">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${course.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800 p-6">
        <Button asChild className="w-full group">
          <Link href={`/courses/${course.id}`} className="flex items-center justify-center">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function CoursePreview() {
  const sortedCourses = [...featuredCourses].sort((a, b) => a.rank - b.rank)

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Courses</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular courses and start your learning journey today
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-6 md:hidden">
          {sortedCourses.map((course, index) => (
            <div key={course.id} className="w-full">
              <FeaturedCourseCard course={course} isTopRanked={index === 0} />
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-center items-end space-x-8">
          <div className="w-1/3 transform translate-y-4">
            <FeaturedCourseCard course={sortedCourses[1]} isTopRanked={false} />
          </div>
          <div className="w-1/3 z-10 transform scale-110">
            <FeaturedCourseCard course={sortedCourses[0]} isTopRanked={true} />
          </div>
          <div className="w-1/3 transform translate-y-8">
            <FeaturedCourseCard course={sortedCourses[2]} isTopRanked={false} />
          </div>
        </div>

        <div className="mt-20 text-center">
          <Button asChild size="lg" className="px-8">
            <Link href="/courses" className="flex items-center">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
