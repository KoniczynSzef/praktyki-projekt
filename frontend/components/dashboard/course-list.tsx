"use client";

import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Course } from "@/app/types/course";
import { getAllCourses } from "@/api/courses/get-all-courses";
import { deleteCourse } from "@/api/courses/delete-course";
import { AuthContext } from "@/auth/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formatter = new Intl.DateTimeFormat("en-us", {
  dateStyle: "medium",
});

export function CourseList() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function handleGetAllCourses() {
      setCourses(await getAllCourses());
    }

    handleGetAllCourses();
  }, []);

  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      try {
        if (!user || !courseToDelete) {
          return;
        }

        await deleteCourse(user.id, courseToDelete);
        toast({
          title: "Course deleted!",
          description: `Course was successfully deleted.`,
        });

        setTimeout(() => {
          window.location.reload();
        }, 250);
      } catch (error) {
        toast({
          title: "Something went wrong during deleting course.",
        });
      } finally {
        setShowDeleteDialog(false);
        setCourseToDelete(null);
      }
    }
  };

  return (
    <>
      <Card className="bg-white/80 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 border-zinc-200 dark:border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800">
              <TableHead className="text-zinc-600 dark:text-zinc-400">
                Subject
              </TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">
                Author
              </TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">
                Category
              </TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">
                Participants
              </TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">
                Start Date
              </TableHead>
              <TableHead className="text-zinc-600 dark:text-zinc-400">
                Format
              </TableHead>
              <TableHead className="text-right text-zinc-600 dark:text-zinc-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow
                key={course.id}
                className="border-zinc-200 dark:border-zinc-800"
              >
                <TableCell className="font-medium text-zinc-900 dark:text-white">
                  {course.name}
                </TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">
                  {course.instructor}
                </TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">
                  {course.badge}
                </TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">
                  {course.signedMembers}/{course.maxMembers}
                </TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">
                  {formatter.format(new Date(course.startDate))}
                </TableCell>
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
            <AlertDialogTitle>
              Are you sure you want to delete this course?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are about to delete course title&quot;. This action cannot be
              undone and will remove all course data including enrolled students
              and materials.
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
  );
}
