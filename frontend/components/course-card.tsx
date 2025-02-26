import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  featured?: boolean;
  startDate: string;
  isRemote: boolean;
}

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export function CourseCard({ course, featured = false }: CourseCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg ${featured ? "border-2 border-primary" : ""}`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="h-48 w-full object-cover md:h-full"
          />
        </div>
        <div className="flex flex-col justify-between md:w-2/3">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-2">{course.category}</Badge>
                <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                <p className="mb-2 text-sm text-gray-600">
                  {course.description}
                </p>
              </div>
              {featured && (
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>Starts: {course.startDate}</span>
              <span>{course.isRemote ? "Remote" : "In-person"}</span>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between bg-gray-50 p-4 dark:bg-gray-800">
            <span className="text-lg font-bold">
              ${course.price.toFixed(2)}
            </span>
            <Button asChild>
              <Link href={`/courses/${course.id}`}>Learn More</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
