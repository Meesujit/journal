"use client";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/src/components/theme/mode-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur dark:bg-black/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left – Logo / Brand */}
        <div className="flex flex-1">
          <Link
            href="/"
            className="text-lg font-semibold text-black dark:text-white absolute top-1/2 left-0 -translate-y-1/2 flex items-center "
          >
            <Image
              src="/nyancat.svg"
              alt="Logo"
              width={40}
              height={40}
              className="w-1/2 h-full"
            />
          </Link>
        </div>

        {/* Center – Nav Links */}
        <div className="hidden md:flex flex-1 justify-center gap-6">
          {[
            { href: "/", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#projects", label: "Projects" },
            { href: "#contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xl font-semibold text-zinc-700 transition-colors hover:text-black hover:font-bold dark:text-zinc-300 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right – Theme Toggle */}
        <div className="flex flex-1 justify-end">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
