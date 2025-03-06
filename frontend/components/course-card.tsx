import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/app/types/course";

interface CourseCardProps {
  courseId: string;
  featured?: boolean;
}

export function CourseCard({ courseId, featured = false }: CourseCardProps) {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`http://localhost:5181/courses/${courseId}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg ${featured ? "border-2 border-primary" : ""}`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={course.ImageURL || "/placeholder.svg"}
            alt={course.Name}
            className="h-48 w-full object-cover md:h-full"
          />
        </div>
        <div className="flex flex-col justify-between md:w-2/3">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-2">{course.SyllabusElements}</Badge>
                <h3 className="mb-2 text-xl font-bold">{course.Name}</h3>
                <p className="mb-2 text-sm text-gray-600">
                  {course.SyllabusElements}
                </p>
              </div>
              {featured && (
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Starts: {new Date(course.StartDate).toDateString()}</span>
              <span>{course.IsRemote ? "Remote" : "In-person"}</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between bg-gray-50 p-4 dark:bg-gray-800">
            <span className="text-lg font-bold">
              ${course.Price.toFixed(2)}
            </span>
            <Button asChild>
              <Link href={`/courses/${course.Id}`}>Learn More</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
export { Course };

