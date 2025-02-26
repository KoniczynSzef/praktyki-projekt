"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"

// This would typically come from your backend
const courses = [
  {
    id: 1,
    subject: "Web Development Bootcamp",
    author: "Jane Doe",
    category: "Programming",
    maxParticipants: 30,
    currentParticipants: 25,
    startDate: "2024-03-15",
    isRemote: true,
  },
  {
    id: 2,
    subject: "UI/UX Design Fundamentals",
    author: "John Smith",
    category: "Design",
    maxParticipants: 20,
    currentParticipants: 15,
    startDate: "2024-03-20",
    isRemote: false,
  },
]

export function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const handleEdit = (courseId: number) => {
    setSelectedCourse(courseId)
  }

  const handleDelete = (courseId: number) => {
    console.log("Delete course:", courseId)
  }

  return (
    <Card className="bg-white dark:bg-black border dark:border-zinc-800">
      <Table>
        <TableHeader>
          <TableRow className="dark:border-zinc-800">
            <TableHead className="dark:text-zinc-400">Subject</TableHead>
            <TableHead className="dark:text-zinc-400">Author</TableHead>
            <TableHead className="dark:text-zinc-400">Category</TableHead>
            <TableHead className="dark:text-zinc-400">Participants</TableHead>
            <TableHead className="dark:text-zinc-400">Start Date</TableHead>
            <TableHead className="dark:text-zinc-400">Format</TableHead>
            <TableHead className="text-right dark:text-zinc-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id} className="dark:border-zinc-800">
              <TableCell className="font-medium dark:text-white">{course.subject}</TableCell>
              <TableCell className="dark:text-zinc-300">{course.author}</TableCell>
              <TableCell className="dark:text-zinc-300">{course.category}</TableCell>
              <TableCell className="dark:text-zinc-300">
                {course.currentParticipants}/{course.maxParticipants}
              </TableCell>
              <TableCell className="dark:text-zinc-300">{course.startDate}</TableCell>
              <TableCell>
                <Badge
                  variant={course.isRemote ? "outline" : "secondary"}
                  className="dark:border-zinc-700 dark:text-zinc-300"
                >
                  {course.isRemote ? "Remote" : "In-person"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(course.id)}
                  className="dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(course.id)}
                  className="dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

