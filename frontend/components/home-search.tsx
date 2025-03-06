"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Code, Briefcase, TrendingUp, Database } from "lucide-react"

const popularCategories = [
  {
    name: "Programming",
    icon: Code,
    color:
      "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50",
  },
  {
    name: "Business",
    icon: Briefcase,
    color:
      "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-800/50",
  },
  {
    name: "Marketing",
    icon: TrendingUp,
    color:
      "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-800/50",
  },
  {
    name: "Data Science",
    icon: Database,
    color:
      "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:hover:bg-orange-800/50",
  },
]

export function HomeSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/courses?category=${encodeURIComponent(category)}`)
  }

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Find Your Perfect Course</h2>
            <p className="text-muted-foreground">
              Search from our library of 10,000+ courses across various categories
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex w-full max-w-2xl mx-auto mb-10">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-base rounded-l-md rounded-r-none border-r-0 h-auto"
              />
            </div>
            <Button type="submit" className="rounded-l-none px-8 text-base h-auto">
              Search
            </Button>
          </form>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Popular Categories</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {popularCategories.map((category) => (
                <Button
                  key={category.name}
                  variant="outline"
                  className={`${category.color} border-0 transition-colors duration-200`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

