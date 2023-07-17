"use client";
import Link from "next/link";
import { useAuthStore } from "@/store";
import { redirect, useRouter } from "next/navigation";
import { basePath } from "@/config/constants";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from "@/components/atoms/logo";

export default function Home() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/login");
    } else {
      redirect(basePath);
    }
  }, [isLoggedIn]);

  return (
    <main className="flex min-h-screen flex-col justify-between py-20 px-24">
      <div className="my-10">
        <Logo />
      </div>
      <Skeleton className="h-[60vh] w-full" />
    </main>
  );
}
