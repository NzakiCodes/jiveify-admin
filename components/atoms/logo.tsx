import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/home">
      <Image src={"/images/logo.png"} width={200} height={50} alt="Logo" />
    </Link>
  );
}

export default Logo;
