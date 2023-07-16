'use client'
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BellDotIcon, BellIcon, SearchIcon } from "lucide-react";
import { Label } from "./ui/label";

import truncateString from "@/utils/truncateString";
import { ProfileDropdownMenu } from "./profile-dropdown-menu";
import { useAuthStore } from "@/store";
import { Skeleton } from "./ui/skeleton";
import { MobileSidebar } from "./sidebar-mobile";

function Topbar({
  hasSearchBox = true,
  title,
}: {
  hasSearchBox?: boolean;
  title?: string;
}) {
  const [notification, setNotification] = useState(true);
  const user = useAuthStore((s) => s.user);

  return (
    <div className="py-4 flex gap-x-3 justify-between px-4 lg:px-8 items-center fixed z-20 w-full lg:max-w-[calc(100vw-280px)] 2xl:max-w-[calc(100vw-340px)]  bg-background shadow-md">
      <div
        className={`flex items-center gap-x-2 ${!!title ? "" : "lg:hidden "} ${
          hasSearchBox ? "w-[30%] lg:w-[20%]" : "w-[40%] "
        }`}
      >
        <MobileSidebar />
        {!!title && (
          <span className="w-[80%] font-bold text-lg lg:text-3xl font-heading text-purple-700 lg:font-extrabold">{title}</span>
        )}
      </div>
      {hasSearchBox && (
        <div
          className={` ${
            hasSearchBox ? "w-[55%]" : "w-[75%]"
          } lg:w-6/12 xl:w-9/12"`}
        >
          <Label className="flex items-center w-full relative">
            <Input placeholder="Search" className="py-6 px-5 w-full rounded-full" />
            <div className="right-2 bg-primary-foreground p-2 rounded-full absolute z-20">
              <SearchIcon size={18} strokeWidth={1} />
            </div>
          </Label>
        </div>
      )}

      <div className="w-[25%] lg:w-4/12 xl:w-3/12  flex gap-x-2 items-center justify-between">
        <Button
          variant={"secondary"}
          size={"icon"}
          onClick={() => setNotification(!notification)}
        >
          {notification ? <BellDotIcon /> : <BellIcon />}
        </Button>
        <div className="flex items-center gap-x-2">
          {user !== null ? (
            <span className="font-heading hidden lg:inline">
              Hello!{" "}
              <span title={user.fullname}>
                {truncateString(user.fullname, 10)}{" "}
              </span>
            </span>
          ) : (
            <Skeleton className="h-5 hidden lg:inline w-[200px]" />
          )}
          <ProfileDropdownMenu user={user} />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
