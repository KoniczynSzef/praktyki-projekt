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
          <DialogTitle>
            Sign Up for <span className="font-bold italic">{courseTitle}</span>
          </DialogTitle>
          <DialogDescription className="py-4">
            This action will enroll you in the selected course. Once confirmed,
            you will gain access to all course materials and upcoming sessions.
            Are you sure you want to proceed with signing up?
          </DialogDescription>
        </DialogHeader>
        <CourseSignUpForm
          onCancel={() => setIsOpen(false)}
          courseId={courseId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
