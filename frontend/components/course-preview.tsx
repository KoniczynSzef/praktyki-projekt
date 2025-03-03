import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function FeaturedCourseCard({ course, isTopRanked }) {
  return (
    <Card className={`flex flex-col ${isTopRanked ? "border-2 border-indigo-500 rounded-lg overflow-hidden" : ""}`}>
      <CardContent className="flex-grow p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge>{course.category}</Badge>
          {isTopRanked && (
            <Badge className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white">Top Rated</Badge>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${course.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="bg-gray-100 dark:bg-gray-800 p-6">
        <Button asChild className="w-full">
          <Link href={`/courses/${course.id}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CoursePreview() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("http://localhost:5181");
        const data = await response.json();
        const sortedCourses = data.sort((a, b) => a.rank - b.rank);
        setCourses(sortedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading courses...</p>;
  }

  return (
    <section className="py-20 sm:py-32">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Featured Courses
        </h2>
        {/* Mobile Layout */}
        <div className="flex flex-col gap-6 md:hidden">
          {courses.map((course, index) => (
            <div key={course.id} className="w-full">
              <FeaturedCourseCard course={course} isTopRanked={index === 0} />
            </div>
          ))}
        </div>
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-center items-end space-x-4">
          {courses.length >= 3 && (
            <>
              <div className="w-1/3 transform translate-y-4">
                <FeaturedCourseCard course={courses[1]} isTopRanked={false} />
              </div>
              <div className="w-1/3 z-10">
                <FeaturedCourseCard course={courses[0]} isTopRanked={true} />
              </div>
              <div className="w-1/3 transform translate-y-8">
                <FeaturedCourseCard course={courses[2]} isTopRanked={false} />
              </div>
            </>
          )}
        </div>
        <div className="mt-20 text-center">
          <Button asChild size="lg">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
