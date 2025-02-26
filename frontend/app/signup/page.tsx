import { Header } from "@/components/header"
import { SignUpForm } from "@/components/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <SignUpForm />
      </main>
    </div>
  )
}

