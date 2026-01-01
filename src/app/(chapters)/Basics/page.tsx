"use client";

import { Copy, Check, Package, Folder, FileText, Terminal, Edit } from "lucide-react";
import { useState } from "react";

interface Command {
  title: string;
  description: string;
  command: string;
  category: string;
}

const basicCommands: Command[] = [
  // 📦 Package Management
  {
    title: "Update & Upgrade",
    description: "Update package lists and upgrade all installed packages to latest versions",
    command: "pkg update && pkg upgrade",
    category: "Package Management",
  },
  {
    title: "Install a Package",
    description: "Install any package from Termux repositories",
    command: "pkg install <package-name>",
    category: "Package Management",
  },

  // 📁 File & Directory Operations
  {
    title: "List Files",
    description: "List all files and folders in the current directory",
    command: "ls",
    category: "Files & Directories",
  },
  {
    title: "Change Directory",
    description: "Navigate into a folder or directory",
    command: "cd <folder>",
    category: "Files & Directories",
  },
  {
    title: "Go Back a Directory",
    description: "Move up one level in the directory hierarchy",
    command: "cd ..",
    category: "Files & Directories",
  },
  {
    title: "Create Directory",
    description: "Create a new folder",
    command: "mkdir <folder>",
    category: "Files & Directories",
  },
  {
    title: "Create Empty File",
    description: "Create a blank file quickly",
    command: "touch <filename>",
    category: "Files & Directories",
  },
  {
    title: "View File Contents",
    description: "Display the complete contents of a text file",
    command: "cat <file>",
    category: "Files & Directories",
  },
  {
    title: "Move or Rename File",
    description: "Move a file to another location or rename it",
    command: "mv <source> <destination>",
    category: "Files & Directories",
  },
  {
    title: "Copy File",
    description: "Create a duplicate of a file",
    command: "cp <source> <destination>",
    category: "Files & Directories",
  },
  {
    title: "Delete File",
    description: "Permanently remove a file",
    command: "rm <file>",
    category: "Files & Directories",
  },
  {
    title: "Delete Directory",
    description: "Remove a directory and all its contents recursively",
    command: "rm -rf <folder>",
    category: "Files & Directories",
  },

  // 📝 Editing & Utilities
  {
    title: "Open Nano Editor",
    description: "Edit text files using the Nano text editor",
    command: "nano <file>",
    category: "Text Editing",
  },
  {
    title: "Clear Terminal",
    description: "Clear the terminal screen and remove all text",
    command: "clear",
    category: "Utilities",
  },
  {
    title: "Help",
    description: "View detailed help and options for any command",
    command: "<command> --help",
    category: "Utilities",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Package Management": <Package className="w-5 h-5" />,
  "Files & Directories": <Folder className="w-5 h-5" />,
  "Text Editing": <Edit className="w-5 h-5" />,
  "Utilities": <Terminal className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Package Management": "from-blue-500 to-cyan-600",
  "Files & Directories": "from-green-500 to-emerald-600",
  "Text Editing": "from-purple-500 to-pink-600",
  "Utilities": "from-orange-500 to-yellow-600",
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

export default function BasicsPage(): JSX.Element {
  const categories = Array.from(new Set(basicCommands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">FUNDAMENTALS</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Termux Basics
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Learn the essential commands for file management, package installation, and terminal navigation. The foundation for everything in Termux.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = basicCommands.filter((cmd) => cmd.category === category);
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
                        {/* Title and Copy Button */}
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors flex-1">
                            {cmd.title}
                          </h3>
                          <CopyButton text={cmd.command} />
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground">
                          {cmd.description}
                        </p>

                        {/* Command Box */}
                        <div className="mt-auto pt-3 border-t border-border">
                          <div className="bg-background border border-border rounded-lg p-3 font-mono text-xs sm:text-sm text-primary overflow-x-auto">
                            <span className="text-muted-foreground">$ </span>
                            {cmd.command}
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
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">💡 Beginner Tips</h3>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li>• Use <code className="bg-background px-2 py-1 rounded text-primary font-mono">pwd</code> to check your current directory location</li>
            <li>• Always use <code className="bg-background px-2 py-1 rounded text-primary font-mono">ls</code> to see what files are in a directory before operating on them</li>
            <li>• Use <code className="bg-background px-2 py-1 rounded text-primary font-mono">--help</code> flag on any command to learn more about it</li>
            <li>• Be careful with <code className="bg-background px-2 py-1 rounded text-primary font-mono">rm</code> - deleted files cannot be recovered easily</li>
            <li>• Use <code className="bg-background px-2 py-1 rounded text-primary font-mono">tab</code> key for auto-completion while typing commands</li>
            <li>• Regular <code className="bg-background px-2 py-1 rounded text-primary font-mono">pkg update && pkg upgrade</code> keeps your system secure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
