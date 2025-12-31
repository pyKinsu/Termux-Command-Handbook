"use client";

import { Github, Star, GitFork, Code2, ExternalLink, ArrowRight, Sparkles, BookOpen, Code, Zap, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FrequentlyAsked } from "@/components/FrequentlyAsked";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
}

export function TermuxHandBook(): JSX.Element {
  const [stats, setStats] = useState<GitHubStats>({
    stars: 0,
    forks: 0,
    watchers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/pyKinsu/Termux-Command-Handbook");
        const data = await response.json();
        setStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          watchers: data.watchers_count || 0,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const features: Feature[] = [
    {
      icon: BookOpen,
      title: "9 Complete Lessons",
      description: "From basics to advanced networking and data management",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Code,
      title: "500+ Commands",
      description: "Every command with real examples and detailed explanations",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Zap,
      title: "Super Fast UI",
      description: "Loads instantly, optimized for mobile and desktop viewing",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      icon: CheckCircle,
      title: "Free & Open",
      description: "No paywalls, no ads, no logins — pure knowledge sharing",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <>
      {/* Open Source Hero Section */}
      <section className="relative w-full bg-background overflow-hidden pt-4 sm:pt-20 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-20">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Open Source Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-green-400">100% Open Source • MIT License</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
            {/* Title */}
            <div className="space-y-3 sm:space-y-4 max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                <span className="text-foreground">Master</span>{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Termux Commands
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The most comprehensive, free, and open-source guide to Termux. Learn 500+ commands across 9 detailed lessons with real examples.
              </p>
            </div>

            {/* GitHub Stats Banner */}
            <div className="w-full max-w-2xl grid grid-cols-3 gap-4 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-primary mb-1 flex items-center justify-center gap-1">
                  <Star className="w-5 h-5" />
                  {loading ? "..." : stats.stars.toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Stars</p>
              </div>
              <div className="text-center border-l border-r border-border">
                <div className="text-2xl sm:text-3xl font-black text-primary mb-1 flex items-center justify-center gap-1">
                  <GitFork className="w-5 h-5" />
                  {loading ? "..." : stats.forks.toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Forks</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-primary mb-1 flex items-center justify-center gap-1">
                  <Code2 className="w-5 h-5" />
                  {loading ? "..." : stats.watchers.toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Watchers</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
              {/* Start Learning */}
              <Link
                href="/Lessons"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-bold text-sm sm:text-base group"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                Start Learning Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Star on GitHub */}
              <a
                href="https://github.com/pyKinsu/Termux-Command-Handbook"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-primary/30 bg-card hover:border-primary hover:bg-primary/5 transition-all duration-300 font-bold text-sm sm:text-base group"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" />
                <span>Star on GitHub</span>
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 group-hover:scale-125 transition-transform" />
              </a>

              {/* Contribute */}
              <a
                href="https://github.com/pyKinsu/Termux-Command-Handbook/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-border bg-card hover:bg-muted transition-all duration-300 font-bold text-sm sm:text-base group"
              >
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" />
                Contribute
              </a>
            </div>

            {/* Additional Info */}
            <div className="pt-4 text-xs sm:text-sm text-muted-foreground space-y-2">
              <p>✨ 9 Complete Lessons • 500+ Commands • Free Forever</p>
              <p>
                <a 
                  href="https://github.com/pyKinsu/Termux-Command-Handbook" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  View on GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-border">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Community Driven</h3>
              <p className="text-sm text-muted-foreground">Contributions welcome from the community</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">MIT Licensed</h3>
              <p className="text-sm text-muted-foreground">Free to use, modify, and distribute</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Github className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Actively Maintained</h3>
              <p className="text-sm text-muted-foreground">Regular updates and improvements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full scroll-mt-12 py-12 sm:py-16 md:py-24 lg:py-32 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center mb-12 sm:mb-16 md:mb-24">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold text-primary">
                  Why Choose This Guide
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-foreground">
                Simple, Practical, and <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Powerful
                </span>
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed px-2">
                Built for learners, hackers, and enthusiasts — get the most out of Termux without wasting time.
              </p>
            </div>

            {/* Scroll Arrow */}
            <div className="mt-8 sm:mt-12 animate-bounce">
              <a href="#features-grid" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-90" />
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {features.map(({ icon: Icon, title, description, gradient }, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Accent */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Step Number */}
                <div className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}>
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="mt-4 inline-flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">
                    <span>Explore</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="mt-16 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-1">
                9
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Complete Lessons
              </p>
            </div>
            <div className="text-center border-l border-r border-border">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-1">
                500+
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Commands
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-1">
                ∞
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Free Forever
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <FrequentlyAsked />
      </section>
    </>
  );

}
