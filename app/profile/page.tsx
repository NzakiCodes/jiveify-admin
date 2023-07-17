import { Button } from "@/components/ui/button";
import { basePath } from "@/config/constants";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      <div>
        <div>
            <Link href={basePath}>
                <Button variant={"outline"} className="rounded-full" size={"icon"}>
                    <ChevronLeft/>
                </Button>
            </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Page;
