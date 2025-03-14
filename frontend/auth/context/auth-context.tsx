"use client";
import React, { useEffect, useState } from "react";
import { authenticateUser } from "../authenticate-user";
import { refreshToken } from "../refresh-token";
import { isUserAdmin } from "../is-user-admin";
import { useParams, usePathname, useRouter } from "next/navigation";

export interface User {
  email: string;
  isEmailConfirmed: boolean;
  id: string;
}

interface AuthContext {
  user: User | null;
  logout: () => void;
  checkUser: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthContext>({
  user: null,
  logout: () => {},
  checkUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  async function checkUser() {
    let userData: User | undefined;
    try {
      userData = await authenticateUser();
    } catch (err) {
      await refreshToken();
      userData = await authenticateUser();
    }

    setUser(userData || null);
    if (!userData) {
      console.log("no data");
    }

    if (pathname === "/dashboard") {
      if (!userData) return;

      const isAdmin = await isUserAdmin(userData?.id);
      if (!isAdmin) {
        router.push("/");
      }
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}
