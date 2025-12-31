"use client";

import { Github, Twitter, Send, ShieldCheck, HeartHandshake, Star } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto my-12 px-4 text-foreground">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4 text-center">📖 About Termux Handbook</h1>

      {/* Description */}
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
        <strong>Termux Handbook</strong> is a free and open guide to help Android users master the Termux terminal.
        This project includes real examples, beginner-to-pro chapters, and no ads or logins — just pure CLI power.
      </p>

      {/* Author */}
      <div className="text-center mt-8">
        <p className="text-lg font-semibold">👨‍💻 Made by <span className="text-primary">Kinsu (@pykinsu)</span></p>
        <p className="text-sm text-muted-foreground mb-6">
          Developer, Linux lover, and minimalist terminal hacker.
        </p>

        {/* Contact Buttons */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <Link
            href="https://github.com/pykinsu"
            target="_blank"
            className="bg-card border border-border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-muted transition"
          >
            <Github className="h-5 w-5" /> GitHub
          </Link>
          <Link
            href="https://t.me/pykinsu"
            target="_blank"
            className="bg-card border border-border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-muted transition"
          >
            <Send className="h-5 w-5" /> Telegram
          </Link>
          <Link
            href="https://twitter.com/pykinsu"
            target="_blank"
            className="bg-card border border-border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-muted transition"
          >
            <Twitter className="h-5 w-5" /> Twitter / X
          </Link>
        </div>
      </div>

      {/* Support This Project */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
          <HeartHandshake className="h-6 w-6 text-pink-500" />
          Support This Project
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Love the Termux Handbook? Help keep it free and growing! You can support the project by sharing or contributing!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="https://github.com/pyKinsu/Termux-Command-Handbook"
            target="_blank"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Contribute on GitHub
          </Link>
          <Link
            href="https://github.com/pykinsu"
            target="_blank"
            className="bg-card border border-border px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-muted transition"
          >
            <Github className="h-5 w-5" /> Follow Me
          </Link>
          <Link
            href="https://github.com/pyKinsu/Termux-Command-Handbook"
            target="_blank"
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition"
          >
            <Star className="h-5 w-5" /> Star the Repo
          </Link>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="mt-16 border-t pt-8 border-border space-y-4 text-sm text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          Privacy Notice
        </h2>
        <p>This site does not collect, store, or process any user data. No analytics, ads, or cookies are used.</p>
        <p>All content is for educational purposes only.</p>
        <p className="italic">For questions, reach out via the contact links above.</p>
      </div>
    </div>
  );
}
