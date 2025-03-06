"use client"
"use client"

import type React from "react"
import type React from "react"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";

interface CourseSearchProps {
  onSearch: (query: string) => void
}

export function CourseSearch({ onSearch }: CourseSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
export function CourseSearch({ onSearch }: CourseSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <Label htmlFor="course-search">Search Courses</Label>
      <Input
        id="course-search"
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="submit" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
  )
}