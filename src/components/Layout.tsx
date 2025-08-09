// components/Layout.tsx
"use client";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-all duration-300">
      <Navbar />
      <main className="flex-1 px-4 sm:px-8 md:px-16 py-8">{children}</main>
      <Footer />
    </div>
  );
}
