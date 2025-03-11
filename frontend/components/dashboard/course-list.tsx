"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null)

  const handleEdit = (courseId: number) => {
    setSelectedCourse(courseId)
  }

  const handleDeleteClick = (courseId: number) => {
    setCourseToDelete(courseId)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      try {
        // Here you would typically make an API call to delete the course
        console.log("Deleting course:", courseToDelete)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        // After successful deletion, you would typically refresh the course list
      } catch (error) {
        console.error("Error deleting course:", error)
      } finally {
        setShowDeleteDialog(false)
        setCourseToDelete(null)
      }
    }
  }

  const courseToDeleteData = courses.find((course) => course.id === courseToDelete)

  return (
    <>
      <Card className="bg-white/80 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 border-zinc-200 dark:border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800">
              <TableHead className="text-zinc-600 dark:text-zinc-400">Subject</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">Author</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">Category</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">Participants</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">Start Date</TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">Format</TableHead>
              <TableHead className="text-right text-zinc-600 dark:text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id} className="border-zinc-200 dark:border-zinc-800">
                <TableCell className="font-medium text-zinc-900 dark:text-white">{course.subject}</TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">{course.author}</TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">{course.category}</TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">
                  {course.currentParticipants}/{course.maxParticipants}
                </TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">{course.startDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={course.isRemote ? "outline" : "secondary"}
                    className="border-zinc-300 dark:border-zinc-700"
                  >
                    {course.isRemote ? "Remote" : "In-person"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(course.id)}
                    className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(course.id)}
                    className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to delete &quot;{courseToDeleteData?.subject}&quot;. This action cannot be undone and will
              remove all course data including enrolled students and materials.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-800"
            >
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

