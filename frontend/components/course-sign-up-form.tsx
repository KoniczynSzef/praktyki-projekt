"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { signUpForCourse } from "@/api/courses/sign-up-for-course";
import { AuthContext } from "@/auth/context/auth-context";
import { useToast } from "@/hooks/use-toast";

interface CourseSignUpFormProps {
  courseId: string;
  onSuccess?: () => void;
}

export function CourseSignUpForm({
  courseId,
  onSuccess,
}: CourseSignUpFormProps) {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  async function signUp() {
    if (!user) {
      toast({
        title: "Unauthorized",
        description:
          "Before signing up for course, you have to sign in to the app.",
      });
      return;
    }
    setIsSubmitting(true);

    await signUpForCourse(courseId, user.id);

    if (onSuccess) {
      onSuccess();
      setTimeout(() => {
        toast({
          title: "Successfully signed up for the course!",
        });
      }, 100);
    }

    setIsSubmitting(false);
    toast({
      title: "Error",
      description: "There was some error during your registration",
    });
  }

  return (
    <Button onClick={signUp} disabled={isSubmitting}>
      {isSubmitting ? "Signing up..." : "Confirm"}
    </Button>
  );
}
