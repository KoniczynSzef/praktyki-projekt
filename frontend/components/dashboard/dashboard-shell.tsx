import type React from "react"

export function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-white dark:bg-black dark:border-zinc-800">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="hidden items-center space-x-2 md:flex">
              <span className="hidden font-bold sm:inline-block dark:text-white">LearnHub Dashboard</span>
            </a>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-black dark:to-blue-950/20">
        <div className="container pt-10 pb-20">{children}</div>
      </div>
    </div>
  )
}

