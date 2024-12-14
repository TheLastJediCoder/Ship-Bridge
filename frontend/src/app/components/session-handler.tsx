"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SessionHandler() {
  const path = usePathname();

  useEffect(() => {
    if (path === "/login") return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }
  }, [path]);
  return <></>;
}
