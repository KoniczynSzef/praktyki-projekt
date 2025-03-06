import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Browse Courses",
    description: "Explore our extensive catalog of courses across various categories and skill levels.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    number: "02",
    title: "Enroll & Learn",
    description: "Sign up for courses that match your interests and learning goals. Start learning at your own pace.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    number: "03",
    title: "Practice & Apply",
    description: "Complete assignments and projects to reinforce your learning and build a portfolio.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
  {
    number: "04",
    title: "Get Certified",
    description: "Earn a certificate upon course completion to showcase your new skills to employers.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">How LearnHub Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to start your learning journey with us
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900 -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-20 md:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`md:flex items-center ${index % 2 === 0 ? "" : "flex-row-reverse"}`}>
                  {/* Step number for mobile */}
                  <div className="absolute -top-4 left-0 md:hidden">
                    <div className="bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 p-6 md:p-10">
                    <div className="max-w-md mx-auto md:mx-0">
                      {/* Step number for desktop */}
                      <div className="hidden md:block mb-4">
                        <div className="bg-blue-600 text-white text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center">
                          {step.number}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="md:w-1/2 mt-6 md:mt-0">
                    <div className="relative rounded-lg overflow-hidden shadow-xl mx-auto max-w-md">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur-sm rounded-lg"></div>
                      <div className="relative">
                        <Image
                          src={step.image || "/placeholder.svg"}
                          alt={step.title}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection dot */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 bottom-0 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2 translate-y-10 hidden md:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

