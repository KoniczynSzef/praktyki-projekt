import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20 transition-opacity duration-1000 ease-in-out"></div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="animate-fade-up bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]">
            Unlock Your Potential with Our Courses
          </h1>
          <p className="animate-fade-up mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Discover a world of knowledge and skills. Our expert-led courses are
            designed to help you achieve your goals and advance your career.
          </p>
          <div className="animate-fade-up mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
