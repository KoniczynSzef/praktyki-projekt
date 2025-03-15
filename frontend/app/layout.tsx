import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "@/auth/context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LearnHub",
  description: "Online learning platform with courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextTopLoader color="#1447e6" />
          <AuthProvider>
            <div className="flex-grow">{children}</div>
          </AuthProvider>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
