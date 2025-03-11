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

const [courses, setCourses] = useState<Course[]>([]);

useEffect(() => {
  fetch("http://localhost:5181/api/courses")
    .then((response) => response.json())
    .then((data: Course[]) => setCourses(data))
    .catch((error) => console.error("Error fetching courses:", error));
}, []);


const courses = [
  { id: 1, title: "Introduction to React", description: "Learn the basics of React", capacity: 20, signedUp: 15 },
  { id: 2, title: "Advanced JavaScript", description: "Master JavaScript concepts", capacity: 15, signedUp: 10 },
  { id: 3, title: "Web Design Fundamentals", description: "Create beautiful web designs", capacity: 25, signedUp: 25 },
]


export function Courses() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} courseId={course.id} />
      ))}
    </div>
  )
}





