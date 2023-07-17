import { Button } from "@/components/ui/button";
import { basePath } from "@/config/constants";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div className="p-16">
      <div>
        <Link
          href={basePath}
          className="flex items-center gap-x-4 w-24 hover:opacity-95"
        >
          <Button variant={"outline"} className="rounded-full" size={"icon"}>
            <ChevronLeft />
          </Button>
          <span>Back</span>
        </Link>
      </div>
      <div className="py-6 px-14">
        <div className="flex justify-between items-center gap-x-1">
          <div className="flex flex-col gap-y-4">
            <h3 className="text-2xl font-heading font-bold">Settings Page</h3>
            <p>Update your photo and personal details here.</p>
          </div>
          <div className="space-x-2">
            <Button variant={"outline"} size={"lg"}>Cancel</Button>
            <Button variant={"ghost"} size={"lg"} className="bg-purple-600 hover:bg-purple-600">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
