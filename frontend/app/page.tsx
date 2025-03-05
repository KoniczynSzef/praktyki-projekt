import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CoursePreview } from "@/components/course-preview";
import { Testimonials } from "@/components/testimonials";
import { HomeSearch } from "@/components/home-search";
import { Features } from "@/components/features";
import { Statistics } from "@/components/statistics";
import { HowItWorks } from "@/components/how-it-works";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-y-24">
        <Hero />
        <HomeSearch />
        <Features />
        <CoursePreview />
        <Statistics />
        <HowItWorks />
        <Testimonials />
      </main>
    </div>
  );
}
