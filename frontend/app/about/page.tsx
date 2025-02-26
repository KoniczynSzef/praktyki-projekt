import { Header } from "@/components/header"
import { Timeline } from "@/components/timeline"

const timelineItems = [
  {
    year: "2010",
    title: "LearnHub Founded",
    description:
      "LearnHub was founded with a vision to make quality education accessible to everyone, anywhere in the world.",
    image: "/images/learnhub-founded.jpg",
  },
  {
    year: "2015",
    title: "Expansion of Course Offerings",
    description:
      "We expanded our course catalog to include a wide range of subjects, from technology to business and creative arts.",
    image: "/images/course-expansion.jpg",
  },
  {
    year: "2018",
    title: "Launch of Mobile App",
    description:
      "Our mobile app was launched, allowing learners to access courses on-the-go and learn at their own pace.",
    image: "/images/mobile-app-launch.jpg",
  },
  {
    year: "2020",
    title: "Introduction of Live Classes",
    description: "We introduced live online classes, bringing real-time interaction between instructors and students.",
    image: "/images/live-classes.jpg",
  },
  {
    year: "2023",
    title: "AI-Powered Learning Paths",
    description:
      "Implemented AI-driven personalized learning paths to help students achieve their goals more effectively.",
    image: "/images/ai-learning-paths.jpg",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-center">About LearnHub</h1>
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg mb-4">
            LearnHub is a leading online learning platform dedicated to providing high-quality education to learners
            worldwide. Our mission is to make learning accessible, engaging, and effective for everyone, regardless of
            their location or background.
          </p>
          <p className="text-lg mb-4">
            With a diverse range of courses taught by industry experts, we empower individuals to acquire new skills,
            advance their careers, and pursue their passions. Our innovative approach to online education combines
            cutting-edge technology with proven pedagogical methods to create an immersive and interactive learning
            experience.
          </p>
          <p className="text-lg">
            Join us on our journey to revolutionize education and unlock the potential of learners around the globe.
          </p>
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <Timeline items={timelineItems} />
      </main>
    </div>
  )
}

