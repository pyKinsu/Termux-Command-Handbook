"use client";

import { Copy, Check, FileText, Folder, Scissors, Search, Lock, Filter } from "lucide-react";
import { useState } from "react";

interface Command {
  command: string;
  description: string;
  category: string;
}

const lesson9Commands: Command[] = [
  // 📄 File Viewing & Reading
  {
    command: "termux-cat [file]",
    description: "Displays the contents of a file.",
    category: "File Viewing",
  },
  {
    command: "termux-head [options] [file]",
    description: "Displays the first part of a file.",
    category: "File Viewing",
  },
  {
    command: "termux-tail [options] [file]",
    description: "Displays the last part of a file.",
    category: "File Viewing",
  },
  {
    command: "termux-less [file]",
    description: "Displays the contents of a file, one screen at a time.",
    category: "File Viewing",
  },
  {
    command: "termux-od [options] [file]",
    description: "Displays the contents of a file in various formats.",
    category: "File Viewing",
  },
  {
    command: "termux-tac [file]",
    description: "Concatenates and prints files in reverse.",
    category: "File Viewing",
  },

  // 📁 File & Directory Management
  {
    command: "termux-ls [options]",
    description: "Lists directory contents.",
    category: "File & Directory",
  },
  {
    command: "termux-pwd",
    description: "Prints the current working directory.",
    category: "File & Directory",
  },
  {
    command: "termux-mkdir [directory]",
    description: "Creates directories.",
    category: "File & Directory",
  },
  {
    command: "termux-cp [source] [destination]",
    description: "Copies files and directories.",
    category: "File & Directory",
  },
  {
    command: "termux-mv [source] [destination]",
    description: "Moves or renames files and directories.",
    category: "File & Directory",
  },
  {
    command: "termux-rm [options] [file]",
    description: "Removes files or directories.",
    category: "File & Directory",
  },
  {
    command: "termux-ln [options] [source] [destination]",
    description: "Creates links to files.",
    category: "File & Directory",
  },
  {
    command: "termux-touch [options] [file]",
    description: "Updates the access and modification times of files.",
    category: "File & Directory",
  },

  // 🔍 File Information & Analysis
  {
    command: "termux-stat [file]",
    description: "Displays file or file system status.",
    category: "File Info",
  },
  {
    command: "termux-file-info [file]",
    description: "Displays information about a file.",
    category: "File Info",
  },
  {
    command: "termux-realpath [file]",
    description: "Displays the absolute path of a file.",
    category: "File Info",
  },
  {
    command: "termux-readlink [options] [file]",
    description: "Displays the value of a symbolic link.",
    category: "File Info",
  },
  {
    command: "termux-which [command]",
    description: "Locates the executable file associated with a given command.",
    category: "File Info",
  },
  {
    command: "termux-md5sum [file]",
    description: "Calculates and verifies MD5 checksums.",
    category: "File Info",
  },
  {
    command: "termux-sum [file]",
    description: "Calculates checksums and counts the number of blocks for a file.",
    category: "File Info",
  },

  // ✂️ Text Processing & Manipulation
  {
    command: "termux-cut [options]",
    description: "Cuts out selected portions of each line of a file.",
    category: "Text Processing",
  },
  {
    command: "termux-paste",
    description: "Combines lines from multiple files.",
    category: "Text Processing",
  },
  {
    command: "termux-sort [options]",
    description: "Sorts lines of text files.",
    category: "Text Processing",
  },
  {
    command: "termux-uniq [options]",
    description: "Reports or omits repeated lines.",
    category: "Text Processing",
  },
  {
    command: "termux-wc [options] [file]",
    description: "Prints newline, word, and byte counts for each file.",
    category: "Text Processing",
  },
  {
    command: "termux-echo [text]",
    description: "Displays a line of text.",
    category: "Text Processing",
  },

  // 📊 File Operations & Utilities
  {
    command: "termux-split [options] [file]",
    description: "Splits a file into pieces.",
    category: "File Operations",
  },
  {
    command: "termux-truncate [options] [file]",
    description: "Shrink or extend the size of a file.",
    category: "File Operations",
  },
  {
    command: "termux-sync",
    description: "Synchronizes cached writes to persistent storage.",
    category: "File Operations",
  },
  {
    command: "termux-xargs [options]",
    description: "Builds and executes command lines from standard input.",
    category: "File Operations",
  },

  // ⚙️ System Information
  {
    command: "termux-whoami",
    description: "Displays the username of the current user.",
    category: "System Info",
  },
  {
    command: "termux-file-editor [file]",
    description: "Opens a file in the default text editor.",
    category: "System Info",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "File Viewing": <FileText className="w-5 h-5" />,
  "File & Directory": <Folder className="w-5 h-5" />,
  "File Info": <Search className="w-5 h-5" />,
  "Text Processing": <Scissors className="w-5 h-5" />,
  "File Operations": <Lock className="w-5 h-5" />,
  "System Info": <Filter className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "File Viewing": "from-blue-500 to-cyan-600",
  "File & Directory": "from-green-500 to-emerald-600",
  "File Info": "from-purple-500 to-indigo-600",
  "Text Processing": "from-yellow-500 to-orange-600",
  "File Operations": "from-red-500 to-pink-600",
  "System Info": "from-orange-500 to-amber-600",
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg bg-card border border-border hover:bg-primary/10 hover:border-primary transition-all duration-300 group"
      title="Copy command"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      )}
    </button>
  );
};

export default function Lesson9Page(): JSX.Element {
  const categories = Array.from(new Set(lesson9Commands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">LESSON 9</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Data Management
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Master data management commands for file operations, text processing, checksums, and efficient data manipulation.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = lesson9Commands.filter((cmd) => cmd.category === category);
            const colorGradient = categoryColors[category];

            return (
              <div key={category} className="mb-16 sm:mb-20">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${colorGradient}`}>
                    {categoryIcons[category]}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {category}
                  </h2>
                  <span className="ml-auto text-sm font-semibold text-muted-foreground bg-card px-3 py-1 rounded-full">
                    {commands.length} commands
                  </span>
                </div>

                {/* Commands Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                  {commands.map((cmd, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden"
                    >
                      {/* Gradient accent on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                      {/* Content */}
                      <div className="relative p-5 sm:p-6 flex flex-col h-full gap-3">
                        {/* Description */}
                        <p className="text-sm text-muted-foreground">
                          {cmd.description}
                        </p>

                        {/* Command Box & Copy Button */}
                        <div className="mt-auto pt-3 border-t border-border">
                          <div className="flex items-center justify-between gap-3">
                            <div className="bg-background border border-border rounded-lg p-3 font-mono text-xs sm:text-sm text-primary overflow-x-auto flex-1">
                              <span className="text-muted-foreground">$ </span>
                              {cmd.command}
                            </div>
                            <CopyButton text={cmd.command} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Tips */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">💡 Data Management Tips</h3>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li>• Use cat, head, and tail to quickly view file contents without opening in an editor</li>
            <li>• Combine cut, paste, and sort for powerful text processing pipelines</li>
            <li>• Always use cp with -r flag when copying directories recursively</li>
            <li>• Use md5sum to verify file integrity and detect corruption</li>
            <li>• Leverage xargs to build complex command lines from input data</li>
            <li>• Use wc to quickly analyze file statistics and line counts</li>
            <li>• Pipe commands together (|) for efficient multi-step data processing</li>
            <li>• Always sync data before critical operations to ensure persistence</li>
            <li>• Test data manipulation commands with copies before modifying originals</li>
          </ul>
        </div>
      </div>
    </div>
  );
                               }
