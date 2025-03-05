import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20 transition-opacity duration-1000 ease-in-out"></div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl -z-10"></div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="mx-auto max-w-2xl text-center md:text-left">
            <h1 className="animate-fade-up bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_1px_1px_rgba(255,255,255,0.1)]">
              Unlock Your Potential with Our Courses
            </h1>
            <p className="animate-fade-up mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Discover a world of knowledge and skills. Our expert-led courses are designed to help you achieve your
              goals and advance your career.
            </p>
            <div className="animate-fade-up mt-10 flex items-center justify-center md:justify-start gap-x-6">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-left">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur"></div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Students learning together"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 rotate-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">1200+ Live Courses</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 -rotate-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">50k+ Happy Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

