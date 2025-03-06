import type React from "react"

export function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-gradient-to-r from-gray-900 to-navy-800 text-white">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="hidden items-center space-x-2 md:flex">
              <span className="hidden font-bold sm:inline-block">LearnHub Dashboard</span>
            </a>
          </div>
        </div>
      </header>
      <div className="bg-gradient-to-r from-gray-900 to-navy-800 pb-20">
        <div className="container pt-10">{children}</div>
      </div>
    </div>
  )
}

