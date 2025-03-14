"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { signUpForCourse } from "@/api/courses/sign-up-for-course";
import { AuthContext } from "@/auth/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

interface CourseSignUpFormProps {
  courseId: string;
  onSuccess?: () => void;
  onCancel: () => void;
}

export function CourseSignUpForm({
  courseId,
  onSuccess,
  onCancel,
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

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        window.location.reload();
      }, 350);
    }

    setIsSubmitting(false);
    toast({
      title: "Error",
      description: "There was some error during your registration",
    });
  }

  return (
    <div className="flex gap-2 items-center ">
      <Button onClick={onCancel} variant={"secondary"} className="w-full">
        Cancel
      </Button>
      <Button onClick={signUp} disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing up..." : "Confirm"}
      </Button>
    </div>
  );
}
