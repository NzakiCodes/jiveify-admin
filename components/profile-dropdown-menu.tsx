import { CreditCard, LogOut, Settings, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import getNameInitials from "@/utils/getNameInitials";
import Link from "next/link";
import { User } from "@/types";
import { Skeleton } from "./ui/skeleton";
import { useAuthStore } from "@/store";

export function ProfileDropdownMenu({ user }: { user: User | null }) {
  const logout = useAuthStore((s) => s.logout);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={user == null}
          size={"icon"}
          variant={"ghost"}
          className="rounded-full"
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/NzakiCodess.png"
              alt="@NzakiCodess"
            />
            {user !== null ? (
              <AvatarFallback>{getNameInitials(user?.fullname)}</AvatarFallback>
            ) : (
              <Skeleton className="h-12 w-12 rounded-full" />
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/profile"}>
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
