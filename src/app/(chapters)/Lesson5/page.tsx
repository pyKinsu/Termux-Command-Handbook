"use client";

import { Copy, Check, Package, Volume2, Zap, Camera, Clipboard, Radio, Download, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Command {
  title: string;
  description: string;
  command: string;
  category: string;
}

const powerUserCommands: Command[] = [
  // 📱 App & Activity Management
  {
    title: "Activity Manager",
    description: "Manages activities running in the background.",
    command: "termux-activity-manager",
    category: "App & Activity",
  },
  {
    title: "App Info",
    description: "Displays information about the specified app.",
    command: "termux-app-info [package_name]",
    category: "App & Activity",
  },
  {
    title: "App List",
    description: "Lists all installed apps.",
    command: "termux-app-list",
    category: "App & Activity",
  },

  // 🔊 Audio
  {
    title: "Audio Info",
    description: "Displays information about the audio system.",
    command: "termux-audio-info",
    category: "Audio",
  },
  {
    title: "Play Audio",
    description: "Plays the specified audio file.",
    command: "termux-audio-play [file]",
    category: "Audio",
  },
  {
    title: "Record Audio",
    description: "Records audio and saves it to the specified file.",
    command: "termux-audio-record [output_file]",
    category: "Audio",
  },
  {
    title: "Record Microphone",
    description: "Records audio using the microphone.",
    command: "termux-microphone-record [output_file]",
    category: "Audio",
  },

  // 🔋 System & Display
  {
    title: "Battery Status",
    description: "Shows battery information.",
    command: "termux-battery-status",
    category: "System & Display",
  },
  {
    title: "Brightness Control",
    description: "Sets screen brightness.",
    command: "termux-brightness [value]",
    category: "System & Display",
  },

  // 📷 Camera
  {
    title: "Camera Info",
    description: "Provides camera information.",
    command: "termux-camera-info",
    category: "Camera",
  },
  {
    title: "Take Photo",
    description: "Takes a photo.",
    command: "termux-camera-photo [output_file]",
    category: "Camera",
  },
  {
    title: "Record Video",
    description: "Records a video.",
    command: "termux-camera-record [output_file]",
    category: "Camera",
  },
  {
    title: "Camera Snapshot",
    description: "Takes a snapshot.",
    command: "termux-camera-snapshot [output_file]",
    category: "Camera",
  },
  {
    title: "Camera Preview",
    description: "Opens a live camera preview.",
    command: "termux-camera-view",
    category: "Camera",
  },

  // 📋 Clipboard & Contacts
  {
    title: "Get Clipboard",
    description: "Gets clipboard contents.",
    command: "termux-clipboard-get",
    category: "Clipboard & Contacts",
  },
  {
    title: "Set Clipboard",
    description: "Sets clipboard contents.",
    command: "termux-clipboard-set [text]",
    category: "Clipboard & Contacts",
  },
  {
    title: "Clear Clipboard",
    description: "Clears clipboard.",
    command: "termux-clipboard-clear",
    category: "Clipboard & Contacts",
  },
  {
    title: "Get Contact",
    description: "Gets contact info.",
    command: "termux-contact-get [contact_name]",
    category: "Clipboard & Contacts",
  },
  {
    title: "List Contacts",
    description: "Lists all contacts.",
    command: "termux-contact-list",
    category: "Clipboard & Contacts",
  },

  // 📡 Infrared & Storage
  {
    title: "IR Frequencies",
    description: "Lists IR frequencies.",
    command: "termux-infrared-frequencies",
    category: "Infrared & Storage",
  },
  {
    title: "IR Transmit",
    description: "Sends IR pattern.",
    command: "termux-infrared-transmit [frequency] [pattern]",
    category: "Infrared & Storage",
  },
  {
    title: "Storage List",
    description: "Lists storage volumes.",
    command: "termux-storage-list",
    category: "Infrared & Storage",
  },
  {
    title: "Storage Info",
    description: "Gets storage path info.",
    command: "termux-storage-get [path]",
    category: "Infrared & Storage",
  },

  // 📲 Utilities
  {
    title: "Download File",
    description: "Downloads a file.",
    command: "termux-download [URL]",
    category: "Utilities",
  },
  {
    title: "System Info",
    description: "Shows system info.",
    command: "termux-info",
    category: "Utilities",
  },
  {
    title: "Fix Shebang",
    description: "Fixes script shebang.",
    command: "termux-fix-shebang [file]",
    category: "Utilities",
  },
  {
    title: "Set Wallpaper",
    description: "Sets wallpaper.",
    command: "termux-wallpaper [file]",
    category: "Utilities",
  },
  {
    title: "Flashlight",
    description: "Toggles flashlight.",
    command: "termux-torch [true/false]",
    category: "Utilities",
  },
  {
    title: "Volume Control",
    description: "Controls volume.",
    command: "termux-volume",
    category: "Utilities",
  },
  {
    title: "Open URL",
    description: "Opens URL in browser.",
    command: "termux-open-url [URL]",
    category: "Utilities",
  },
  {
    title: "Open File",
    description: "Opens file/path.",
    command: "termux-open [file/path]",
    category: "Utilities",
  },
  {
    title: "Keyring Manager",
    description: "Manages secrets.",
    command: "termux-keyring [options]",
    category: "Utilities",
  },
  {
    title: "Upload File",
    description: "Uploads file.",
    command: "termux-upload [source_file] [destination_directory]",
    category: "Utilities",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "App & Activity": <Package className="w-5 h-5" />,
  "Audio": <Volume2 className="w-5 h-5" />,
  "System & Display": <Zap className="w-5 h-5" />,
  "Camera": <Camera className="w-5 h-5" />,
  "Clipboard & Contacts": <Clipboard className="w-5 h-5" />,
  "Infrared & Storage": <Radio className="w-5 h-5" />,
  "Utilities": <Download className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "App & Activity": "from-blue-500 to-cyan-600",
  "Audio": "from-purple-500 to-pink-600",
  "System & Display": "from-yellow-500 to-orange-600",
  "Camera": "from-red-500 to-pink-600",
  "Clipboard & Contacts": "from-green-500 to-emerald-600",
  "Infrared & Storage": "from-indigo-500 to-purple-600",
  "Utilities": "from-orange-500 to-red-600",
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

const CategorySection = ({ 
  category, 
  commands, 
  colorGradient 
}: { 
  category: string; 
  commands: Command[]; 
  colorGradient: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-8">
      {/* Category Header - Collapsible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 mb-6 group"
      >
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorGradient}`}>
          {categoryIcons[category]}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex-1 text-left">
          {category}
        </h2>
        <span className="text-sm font-semibold text-muted-foreground bg-card px-3 py-1 rounded-full">
          {commands.length}
        </span>
        <div className="text-muted-foreground group-hover:text-foreground transition-colors">
          {isOpen ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </div>
      </button>

      {/* Commands Grid - Expandable */}
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {commands.map((cmd, idx) => (
            <div
              key={idx}
              className="group/cmd relative rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient accent on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-0 group-hover/cmd:opacity-5 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative p-5 sm:p-6 flex flex-col h-full gap-3">
                {/* Title and Copy Button */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover/cmd:text-primary transition-colors flex-1">
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
      )}
    </div>
  );
};

export default function Lesson5Page(): JSX.Element {
  const categories = Array.from(new Set(powerUserCommands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">LESSON 5</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Power User Commands
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Unlock specialized commands for app management, audio control, camera access, and advanced device utilities designed for power users.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = powerUserCommands.filter((cmd) => cmd.category === category);
            const colorGradient = categoryColors[category];

            return (
              <CategorySection
                key={category}
                category={category}
                commands={commands}
                colorGradient={colorGradient}
              />
            );
          })}
        </div>
      </div>

      {/* Footer Tips */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">💡 Power User Tips</h3>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li>• Use collapsible sections to organize commands - click category headers to expand/collapse</li>
            <li>• Combine multiple commands in bash scripts for complex automation workflows</li>
            <li>• App management commands help you analyze and control installed applications</li>
            <li>• Audio and camera commands provide direct hardware access for media creation</li>
            <li>• Use clipboard and contact commands to integrate with Android system data</li>
            <li>• Battery status monitoring is useful for power-intensive scripts and automation</li>
            <li>• Keyring manager securely stores sensitive information for automated scripts</li>
            <li>• Test all commands with appropriate permissions enabled in device settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
