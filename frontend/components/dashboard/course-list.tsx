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
  // Add more courses as needed
]

export function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const handleEdit = (courseId: number) => {
    setSelectedCourse(courseId)
    // Implement edit functionality
  }

  const handleDelete = (courseId: number) => {
    // Implement delete functionality
    console.log("Delete course:", courseId)
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Format</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.subject}</TableCell>
              <TableCell>{course.author}</TableCell>
              <TableCell>{course.category}</TableCell>
              <TableCell>
                {course.currentParticipants}/{course.maxParticipants}
              </TableCell>
              <TableCell>{course.startDate}</TableCell>
              <TableCell>
                <Badge variant={course.isRemote ? "outline" : "secondary"}>
                  {course.isRemote ? "Remote" : "In-person"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(course.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
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

