"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { CreateCourseDto, Level } from "@/app/types/course";
import { AuthContext } from "@/auth/context/auth-context";
import {
  formatLevelEnum,
  formatStringToLevelEnum,
} from "@/utils/format-level-enum";
import { createCourse } from "@/api/courses/create-course";
import { useToast } from "@/hooks/use-toast";
import Page from "@/app/courses/[id]/sign-in/page";

const formSchema = z.object({
  author: z
    .string()
    .min(2, { message: "Author name must be at least 2 characters." }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters." }),
  category: z.string({ required_error: "Please select a category." }),
  maxParticipants: z
    .number()
    .min(1, { message: "At least 1 participant is required." }),
  startDate: z.date({ required_error: "A start date is required." }),
  isRemote: z.boolean().default(false),
  syllabus: z
    .string()
    .min(10, { message: "Syllabus must be at least 10 characters." }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters." }),
  photo: z.string().optional(),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  durationInDays: z
    .number()
    .min(1, { message: "Duration must be at least 1 day." }),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"], {
    errorMap: () => ({ message: "Invalid level selected." }),
  }),
});

export function CreateCourseForm() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const className = "dark:text-red-600";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      subject: "",
      category: "",
      maxParticipants: 1,
      isRemote: false,
      syllabus: "",
      description: "",
      price: 0,
      durationInDays: 30,
      level: formatLevelEnum(Level.Beginner),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const course: CreateCourseDto = {
      name: values.subject,
      instructor: values.author,
      badge: values.category,
      price: values.price,
      maxMembers: values.maxParticipants,
      startDate: values.startDate,
      description: values.description,
      signedMembers: 0,
      syllabusElements: values.syllabus.split("\n"),
      isRemote: values.isRemote,
      imageURL: values.photo || "",
      durationInDays: values.durationInDays,
      level: formatStringToLevelEnum(values.level),
    };

    try {
      if (!user) {
        return;
      }

      const message = await createCourse(user.id, course);
      if (message.startsWith("C")) {
        toast({
          title: "Created course successfully!",
          description: `Course ${course.name} has been successfully created. It's now available for enrollment and management.`,
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 250);
      } else {
        toast({
          title: message,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 border-zinc-200 dark:border-zinc-800">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage className={className} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Master Web Development" {...field} />
                    </FormControl>
                    <FormMessage className={className} />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>

                    <Input placeholder="Programming" list="badges" {...field} />

                    <datalist id="badges">
                      <option value="Programming" />
                      <option value="Design" />
                      <option value="Business" />
                      <option value="Marketing" />
                      <option value="Data" />
                    </datalist>

                    <FormMessage className={className} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage className={className} />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Participants</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage className={className} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className={className} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level">
                            {field.value ?? "Select level"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="durationInDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (in days)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage className={className} />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a detailed description of the course..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={className} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="syllabus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syllabus</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the course syllabus..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each topic on a new line
                  </FormDescription>
                  <FormMessage className={className} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRemote"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Remote Course</FormLabel>
                    <FormDescription>
                      This course will be conducted online
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Here you would typically handle file upload
                          field.onChange(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a cover image for your course
                  </FormDescription>
                  <FormMessage className={className} />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
