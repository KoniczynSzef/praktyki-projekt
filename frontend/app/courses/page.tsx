import { Header } from "@/components/header"
import { CourseSearch } from "@/components/course-search"
import { CourseCard } from "@/components/course-card"

// This would typically come from a database or API
const allCourses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description: "Master full-stack web development",
    image: "/course-web-dev.jpg",
    category: "Programming",
    price: 99.99,
    featured: true,
    startDate: "2023-09-01",
    isRemote: true,
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description: "Learn the basics of data analysis",
    image: "/course-data-science.jpg",
    category: "Data",
    price: 89.99,
    featured: true,
    startDate: "2023-10-15",
    isRemote: true,
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "Boost your online marketing skills",
    image: "/course-marketing.jpg",
    category: "Marketing",
    price: 79.99,
    startDate: "2023-09-15",
    isRemote: false,
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Create iOS and Android apps",
    image: "/course-mobile-dev.jpg",
    category: "Programming",
    price: 94.99,
    startDate: "2023-11-01",
    isRemote: true,
  },
  {
    id: 5,
    title: "Machine Learning Essentials",
    description: "Dive into AI and machine learning",
    image: "/course-ml.jpg",
    category: "Data",
    price: 109.99,
    featured: true,
    startDate: "2023-10-01",
    isRemote: true,
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">All Courses</h1>
        <div className="mb-8">
          <CourseSearch onSearch={() => {}} />
        </div>
        <div className="space-y-8">
          {allCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  )
}

