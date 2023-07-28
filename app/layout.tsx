"use client";
import Providers from "@/utils/provider";
import "./globals.css";
import { Inter, DM_Sans } from "next/font/google";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/utils/theme-provider";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], fallback:["san-serif"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Jiveify - Podcast Recording, Editing, and Publishing</title>
        <meta
          name="description"
          content="Create, edit, and publish your podcasts with ease using Jiveify. The ultimate podcast app that empowers you to bring your ideas to life. Join the podcasting revolution and reach a global audience with Jiveify."
        />
      </head>
      <body className={`${dm_sans.className}`}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
