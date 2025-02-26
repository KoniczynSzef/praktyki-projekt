import { Header } from "@/components/header"
import { SignInForm } from "@/components/sign-in-form"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <SignInForm />
      </main>
    </div>
  )
}

