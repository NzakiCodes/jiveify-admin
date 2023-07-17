import { basePath } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={basePath}>
      <Image src={"/images/logo.png"} width={200} height={50} alt="Logo" />
    </Link>
  );
}

export default Logo;
