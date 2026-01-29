"use client";

import { useEffect } from "react";
import { initAuth } from "@/shared/api/auth/InitAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAuth();
  }, []);

  return <>{children}</>;
}
