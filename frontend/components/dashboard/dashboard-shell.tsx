import type React from "react"

export function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed inset-0 bg-gradient-to-br from-white to-blue-50/50 dark:bg-gradient-to-r dark:from-[#243B55] dark:to-[#141E30] -z-10" />
      <header className="sticky top-0 z-40 border-b bg-secondary dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80 dark:supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="hidden items-center space-x-2 md:flex">
              <span className="hidden font-bold text-foreground dark:text-white sm:inline-block">
                LearnHub Dashboard
              </span>
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-10">{children}</div>
      </main>
    </div>
  )
}

