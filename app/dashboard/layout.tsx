"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAppStore, useAuthStore } from "@/store";
import { Sidebar } from "@/components/sidebar";
import { axiosAuth } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  return axiosAuth.get("/profile");
};
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const userQuery = useQuery(["fetch-user-data"], fetchUser);
  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    if (userQuery.isSuccess) {
      setUser(userQuery.data.data);
    }

    if (userQuery.isError) {
      console.log(userQuery.error);
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userQuery]);
  return (
    <div className="max-w-[1600px] mx-auto bg-background">
      <div className="bg-background">
        <div className="grid lg:grid-cols-12 xl:grid-cols-10 w-full">
          <Sidebar className="hidden lg:block bg-background lg:relative z-30 col-span-3 xl:col-span-2" />
          <div className=" lg:col-span-9 xl:col-span-8 max-w-[100vw] space-y-16 border-l">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
