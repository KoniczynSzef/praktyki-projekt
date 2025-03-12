"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";
import { signOut } from "@/auth/sign-out";
import { useToast } from "@/hooks/use-toast";
import { authenticateUser } from "@/auth/authenticate-user";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const { toast } = useToast();

  React.useEffect(() => {
    async function handleAuthenticate() {
      const userData = await authenticateUser();
      if (!userData) {
        setUserEmail("");
        return;
      }

      setUserEmail(userData.email);
    }

    handleAuthenticate();
  }, []);

  function handleSignOut() {
    signOut();

    toast({
      title: "Sign out",
      description: "You have been signed out successfully.",
    });

    setUserEmail("");
  }

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
          {userEmail ? (
            <Button variant="destructive" onClick={handleSignOut}>
              Sign out
            </Button>
          ) : (
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
