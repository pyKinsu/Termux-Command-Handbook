"use client";

import { useState } from "react";
import { BookOpen, Zap, Target, ArrowRight, Lock, Unlock } from "lucide-react";

interface Lesson {
  title: string;
  href: string;
  id: number;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const LESSONS: Lesson[] = [
  { 
    title: "Download Termux", 
    href: "/How-to-download-termux", 
    id: 1, 
    description: "Get started with installation", 
    difficulty: "beginner" 
  },
  { 
    title: "Basics", 
    href: "/Basics", 
    id: 2, 
    description: "Learn fundamental concepts", 
    difficulty: "beginner" 
  },
  { 
    title: "Core Commands", 
    href: "/Lesson1", 
    id: 3, 
    description: "Essential terminal commands and package management", 
    difficulty: "beginner" 
  },
  { 
    title: "Intermediate Commands", 
    href: "/Lesson2", 
    id: 4, 
    description: "Audio, SMS, camera, and advanced device features", 
    difficulty: "intermediate" 
  },
  { 
    title: "Advanced Commands", 
    href: "/Lesson3", 
    id: 5, 
    description: "Master complex system operations and automation", 
    difficulty: "advanced" 
  },
  { 
    title: "Expert Commands", 
    href: "/Lesson4", 
    id: 6, 
    description: "Unlock full device integration and API access", 
    difficulty: "advanced" 
  },
  { 
    title: "Power User Commands", 
    href: "/Lesson5", 
    id: 7, 
    description: "Specialized commands for app management and hardware", 
    difficulty: "advanced" 
  },
  { 
    title: "Developer Commands", 
    href: "/Lesson6", 
    id: 8, 
    description: "Clipboard, notifications, and system interaction", 
    difficulty: "intermediate" 
  },
  { 
    title: "System Administration", 
    href: "/Lesson7", 
    id: 9, 
    description: "Package management, security, and configuration", 
    difficulty: "advanced" 
  },
  { 
    title: "Network Administration", 
    href: "/Lesson8", 
    id: 10, 
    description: "Connectivity, monitoring, and security auditing", 
    difficulty: "advanced" 
  },
  { 
    title: "Data Management", 
    href: "/Lesson9", 
    id: 11, 
    description: "File operations, text processing, and data manipulation", 
    difficulty: "intermediate" 
  },
];

const difficultyConfig = {
  beginner: { color: "from-emerald-500 to-teal-600", label: "Beginner", badge: "bg-emerald-500/20 text-emerald-300" },
  intermediate: { color: "from-blue-500 to-cyan-600", label: "Intermediate", badge: "bg-blue-500/20 text-blue-300" },
  advanced: { color: "from-orange-500 to-red-600", label: "Advanced", badge: "bg-orange-500/20 text-orange-300" },
};

export default function ChaptersPage(): JSX.Element {
  const [hoveredLesson, setHoveredLesson] = useState<number | null>(null);
  const [selectedPath, setSelectedPath] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");

  const filteredLessons = selectedPath === "all" 
    ? LESSONS 
    : LESSONS.filter(l => l.difficulty === selectedPath);

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Header */}
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-blue-400 tracking-widest uppercase">Learning Path</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 sm:mb-4 leading-tight">
            Termux <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Mastery</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl">
            Progress from complete beginner to advanced terminal expert. Each lesson builds on the previous one with practical, hands-on learning.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 mb-12 sm:mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {(["all", "beginner", "intermediate", "advanced"] as const).map((path) => (
              <button
                key={path}
                onClick={() => setSelectedPath(path)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  selectedPath === path
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                    : "bg-card text-muted-foreground hover:bg-slate-700/50 hover:text-foreground border border-border dark:hover:bg-slate-700/50"
                }`}
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {filteredLessons.map((lesson) => {
              const config = difficultyConfig[lesson.difficulty];
              return (
                <a
                  key={lesson.id}
                  href={lesson.href}
                  onMouseEnter={() => setHoveredLesson(lesson.id)}
                  onMouseLeave={() => setHoveredLesson(null)}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer h-auto sm:h-auto"
                >
                  {/* Card background */}
                  <div className="absolute inset-0 bg-card border border-border group-hover:border-slate-600 transition-all duration-300" />

                  {/* Gradient accent on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${config.color} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10`} />

                  {/* Content */}
                  <div className="relative p-5 sm:p-6 md:p-7 flex flex-col h-full gap-4 sm:gap-5">
                    {/* Top section */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <span className={`inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold ${config.badge} mb-3 sm:mb-4`}>
                          {config.label}
                        </span>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-slate-100 transition-colors duration-300 leading-snug">
                          {lesson.title}
                        </h3>
                      </div>
                      <div className={`p-2.5 sm:p-3 rounded-lg bg-gradient-to-br ${config.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {lesson.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                      <span className="text-xs sm:text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                        Lesson {lesson.id}
                      </span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredLessons.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24">
              <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-slate-600 mb-4" />
              <p className="text-slate-400 text-sm sm:text-base">No lessons in this category yet</p>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}
