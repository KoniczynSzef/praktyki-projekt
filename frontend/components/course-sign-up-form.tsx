"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { signUpForCourse } from "@/api/courses/sign-up-for-course";
import { AuthContext } from "@/auth/context/auth-context";

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
    setIsSubmitting(false);

    toast({
      title: "Successfully signed up for the course!",
    });

    if (onSuccess) {
      onSuccess();
    }

    setIsSubmitting(false);
  }

  return (
    <Button onClick={signUp} disabled={isSubmitting}>
      {isSubmitting ? "Signing up..." : "Confirm"}
    </Button>
  );
}
