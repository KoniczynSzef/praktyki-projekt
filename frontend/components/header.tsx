"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

async function getUserEmail() {
  const token = localStorage.getItem("token");

  if (!token) {
    return "";
  }

  const response = await fetch("http://localhost:5181/identity/manage/info");

  if (!response.ok) {
    return "";
  }

  const data = (await response.json()) as {
    email: string;
  };

  return data.email;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  React.useEffect(() => {
    async function getUserEmail() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setUserEmail("");
        console.log("no token");
        return;
      }

      const response = await fetch(
        "http://localhost:5181/identity/manage/info",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!response.ok) {
        setUserEmail("");
        return;
      }

      const data = (await response.json()) as {
        email: string;
      };

      setUserEmail(data.email);
    }
    getUserEmail();
  }, []);

  return (
    <header className="bg-background shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 py-6">
        <Link href="/" className="text-2xl font-bold text-primary">
          LearnHub
        </Link>
        <div className="hidden items-center space-x-6 md:flex">
          <Button variant="ghost" asChild className="hover:underline">
            <Link href="/courses">Courses</Link>
          </Button>
          <Button variant="ghost" asChild className="hover:underline">
            <Link href="/about">About Us</Link>
          </Button>
          <Button variant="ghost" asChild className="hover:underline">
            <Link href="/contact">Contact</Link>
          </Button>
          <ThemeToggle />
          {userEmail ? null : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden animate-expand-down origin-top">
          <div className="space-y-2 px-4 pb-4 pt-2">
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start hover:underline"
            >
              <Link href="/courses">Courses</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start hover:underline"
            >
              <Link href="/about">About Us</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start hover:underline"
            >
              <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="ghost" asChild className="w-full justify-start">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
