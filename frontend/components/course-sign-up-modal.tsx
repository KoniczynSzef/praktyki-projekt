"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CourseSignUpForm } from "@/components/course-sign-up-form";

interface CourseSignUpModalProps {
  courseId: string;
  courseTitle: string;
}

export function CourseSignUpModal({
  courseId,
  courseTitle,
}: CourseSignUpModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Sign Up for Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign Up for {courseTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form below to sign up for this course. We'll contact
            you with further details.
          </DialogDescription>
        </DialogHeader>
        <CourseSignUpForm
          courseId={courseId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
