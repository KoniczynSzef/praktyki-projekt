import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CourseSignUpModal } from "@/components/course-sign-up-modal"

// This would typically come from a database or API
const courses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description:
      "Master full-stack web development with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and gain the skills needed to become a professional web developer.",
    image: "/course-web-dev.jpg",
    category: "Programming",
    price: 99.99,
    featured: true,
    instructor: "Jane Doe",
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    startDate: "2023-09-01",
    maxMembers: 30,
    currentMembers: 18,
    isRemote: true,
    syllabus: [
      "Introduction to HTML and CSS",
      "JavaScript Fundamentals",
      "React Basics",
      "Node.js and Express",
      "Database Integration with MongoDB",
      "Authentication and Authorization",
      "Deployment and DevOps",
    ],
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    description:
      "Dive into the world of data science with this foundational course. Learn Python, statistics, data visualization, and machine learning basics. Analyze real-world datasets and start your journey to becoming a data scientist.",
    image: "/course-data-science.jpg",
    category: "Data",
    price: 89.99,
    featured: true,
    instructor: "John Smith",
    duration: "8 weeks",
    level: "Beginner",
    startDate: "2023-10-15",
    maxMembers: 25,
    currentMembers: 12,
    isRemote: true,
    syllabus: [
      "Introduction to Python for Data Science",
      "Data Cleaning and Preprocessing",
      "Exploratory Data Analysis",
      "Statistical Analysis",
      "Machine Learning Basics",
      "Data Visualization",
      "Final Project",
    ],
  },
  {
    id: 3,
    title: "Mobile App Development",
    description:
      "Learn to build mobile apps for iOS and Android platforms using React Native. Create cross-platform applications with a single codebase.",
    image: "/course-mobile-dev.jpg",
    category: "Programming",
    price: 94.99,
    instructor: "Alice Johnson",
    duration: "10 weeks",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Machine Learning Essentials",
    description:
      "Explore the fundamentals of machine learning and artificial intelligence. Learn about neural networks, deep learning, and practical applications of AI.",
    image: "/course-ml.jpg",
    category: "Data",
    price: 109.99,
    instructor: "Bob Williams",
    duration: "12 weeks",
    level: "Intermediate to Advanced",
  },
]

function SuggestedCourseCard({ course }: { course: (typeof courses)[0] }) {
  return (
    <Card>
      <CardContent className="p-4">
        {course.image ? (
          <img src={course.image || "/placeholder.svg"} alt={course.title} className="mb-4 h-32 w-full object-cover" />
        ) : (
          <div className="mb-4 h-32 w-full bg-gray-200 dark:bg-gray-700"></div>
        )}
        <h3 className="mb-2 text-lg font-semibold">{course.title}</h3>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">{course.instructor}</p>
        <Badge>{course.category}</Badge>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="font-bold">${course.price.toFixed(2)}</span>
        <Button asChild variant="outline" size="sm">
          <Link href={`/courses/${course.id}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === Number.parseInt(params.id))

  if (!course) {
    notFound()
  }

  const suggestedCourses = courses.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge className="mb-2">{course.category}</Badge>
            <h1 className="text-3xl font-bold md:text-4xl">{course.title}</h1>
            {course.image ? (
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full rounded-lg object-cover shadow-lg md:h-64"
              />
            ) : (
              <div className="h-48 w-full rounded-lg bg-gray-200 shadow-lg dark:bg-gray-700 md:h-64"></div>
            )}
            <p className="text-lg text-gray-600 dark:text-gray-300">{course.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-blue-600">${course.price.toFixed(2)}</p>
              <CourseSignUpModal courseId={course.id} courseTitle={course.title} />
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div>
            <h2 className="mb-4 text-2xl font-bold">Course Plan</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Start Date</h3>
                <p>{course.startDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Duration</h3>
                <p>{course.duration}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Instructor</h3>
                <p>{course.instructor}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Level</h3>
                <p>{course.level}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Members</h3>
                <p>
                  {course.currentMembers} / {course.maxMembers}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Format</h3>
                <p>{course.isRemote ? "Remote" : "In-person"}</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div>
            <h2 className="mb-4 text-2xl font-bold">Syllabus</h2>
            <ul className="list-inside list-disc space-y-2">
              {course.syllabus.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-8 text-2xl font-bold">Suggested Courses</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedCourses.map((suggestedCourse) => (
                <SuggestedCourseCard key={suggestedCourse.id} course={suggestedCourse} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

