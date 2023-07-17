"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Logo from "./atoms/logo";
import {
  FileAudioIcon,
  HomeIcon,
  LucideIcon,
  MoonIcon,
  SunIcon,
  Users,
  Users2,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateCatogory } from "./create-category";
import Link, { LinkProps } from "next/link";
import { basePath } from "@/config/constants";
import React, { useEffect, useState } from "react";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarLink = (
  props: LinkProps &
    React.HTMLAttributes<HTMLAnchorElement> & { isActive: boolean }
) => {
  return (
    <Link
      {...props}
      className={`block rounded-lg ${
        props.isActive
          ? "bg-purple-200 text-purple-800 border-l-4 rounded-l-none border-purple-800 dark:text-purple-300 dark:bg-secondary"
          : ""
      }`}
    >
      {props.children}
    </Link>
  );
};

const sidebarlinks: {
  href: string;
  icon: LucideIcon;
  text: string;
}[] = [
  {
    href: "/",
    icon: HomeIcon,
    text: "Home",
  },
  {
    href: "/podcasters",
    icon: Users2,
    text: "Podcasters",
  },
  {
    href: "/published-podcasts",
    icon: FileAudioIcon,
    text: "Published Podcasts",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const { setTheme } = useTheme();
  const [active, setActive] = useState<string>(sidebarlinks[0].href);
  useEffect(() => {
    if (window && window.location.pathname) {
      setActive(window.location.pathname);
    }
  }, []);
  return (
    <div className={cn("pb-12 h-full min-h-screen relative ", className)}>
      <div className="space-y-2 lg:py-4 flex flex-col justify-between relative lg:fixed max-w-[280px] h-full">
        <div className="flex flex-col gap-y-3 items-start h-full">
          <div className="lg:px-6 lg:py-2">
            <Logo />
          </div>

          <div className="lg:px-3 py-2">
            <div className="space-y-2 lg:space-y-4">
              {sidebarlinks.map(({ href, icon, text }, idx) => {
                const Icon: LucideIcon = icon;
                const newHref = `${basePath}${href}`
                return (
                  <SidebarLink
                    onClick={() => setActive(newHref)}
                    isActive={active == newHref}
                    key={idx}
                    href={newHref}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start !py-6"
                    >
                      <Icon className="mr-2 " strokeWidth={1.3} />
                      {text}
                    </Button>
                  </SidebarLink>
                );
              })}

              <CreateCatogory />
            </div>
          </div>
        </div>

        <div className="lg:px-6 flex w-full justify-end pb-16 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
