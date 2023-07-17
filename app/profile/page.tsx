import Link from "next/link";
import React from "react";

function Page() {
  return (
    <div>
      <div>
        <div>
            <Link href={"/dashboard"}></Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Page;
