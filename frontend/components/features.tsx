import {
  Lightbulb,
  Users,
  BadgeIcon as Certificate,
  Clock,
  Globe,
  MessageSquare,
  Smartphone,
  Award,
} from "lucide-react"

const features = [
  {
    icon: Lightbulb,
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience and expertise.",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  },
  {
    icon: Certificate,
    title: "Recognized Certificates",
    description: "Earn certificates that are recognized by top employers worldwide.",
    color: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to course materials.",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Join a diverse community of learners from over 190 countries.",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  },
  {
    icon: MessageSquare,
    title: "Interactive Learning",
    description: "Engage with instructors and peers through discussions and projects.",
    color: "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300",
  },
  {
    icon: Smartphone,
    title: "Mobile Learning",
    description: "Access courses on any device, anywhere, anytime with our mobile app.",
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
  },
  {
    icon: Users,
    title: "Collaborative Projects",
    description: "Work on real-world projects with other students to build your portfolio.",
    color: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  },
  {
    icon: Award,
    title: "Quality Content",
    description: "All courses are reviewed for quality and relevance before publication.",
    color: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose LearnHub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform offers everything you need to advance your skills and achieve your learning goals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

