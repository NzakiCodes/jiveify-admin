import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SidebarOpen } from "lucide-react";
import { Sidebar } from "./sidebar";


export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex lg:hidden" size={"icon"}>
          <SidebarOpen />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:hidden" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
