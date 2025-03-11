import { useEffect, useState } from "react";
import { CourseCard } from "@/components/course-card";

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

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("http://localhost:5181/api/Course/GetAllCourses")
      .then((response) => response.json())
      .then((data: Course[]) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
    console.log(courses);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
