"use client";

import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette } from "./CommandPalette";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 text-foreground backdrop-blur-md transition-all duration-300">
      <nav className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full h-16">
        {/* Left: MobileNav */}
        <MobileNav />

        {/* Center: Text Logo */}
        <Link
          href="/"
          className="flex justify-center select-none"
          prefetch={false}
        >
          <div className="flex items-center gap-2">
            <span className="logo-primary">Termux</span>
            <span className="logo-secondary">Handbook</span>
          </div>
        </Link>

        {/* Right: Search + theme toggle */}
        <div className="flex items-center justify-end gap-2">
          <CommandPalette />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background text-muted-foreground transition-all duration-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="logo-primary">Termux</span>
          <span className="logo-secondary">Handbook</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {year}{" "}
          <a
            href="https://github.com/pykinsu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-primary transition-colors"
          >
            Kinsu Rajput
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
