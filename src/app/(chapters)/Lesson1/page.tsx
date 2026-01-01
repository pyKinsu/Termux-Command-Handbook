"use client";

import { Copy, Check, Package, Folder, Bell, Clipboard, Camera, Wifi } from "lucide-react";
import { useState } from "react";

interface Command {
  title: string;
  description: string;
  command: string;
  category: string;
}

const lesson1Commands: Command[] = [
  // 📦 Package Management
  {
    title: "Update Packages",
    description: "Updates the package lists for upgrades and installs",
    command: "pkg update",
    category: "Package Management",
  },
  {
    title: "Upgrade Packages",
    description: "Upgrades all installed packages to their latest version",
    command: "pkg upgrade",
    category: "Package Management",
  },
  {
    title: "Install Package",
    description: "Installs a package",
    command: "pkg install [package_name]",
    category: "Package Management",
  },
  {
    title: "Uninstall Package",
    description: "Uninstalls a package",
    command: "pkg uninstall [package_name]",
    category: "Package Management",
  },
  {
    title: "Search Packages",
    description: "Searches for packages containing the keyword",
    command: "pkg search [keyword]",
    category: "Package Management",
  },
  {
    title: "List All Packages",
    description: "Lists all available packages",
    command: "pkg list-all",
    category: "Package Management",
  },
  {
    title: "Package Info",
    description: "Displays information about a package",
    command: "pkg info [package_name]",
    category: "Package Management",
  },
  {
    title: "List Installed Packages",
    description: "Lists all installed packages",
    command: "pkg list-installed",
    category: "Package Management",
  },

  // 📂 File & Storage
  {
    title: "Setup Storage",
    description: "Sets up storage access for Termux",
    command: "termux-setup-storage",
    category: "File & Storage",
  },
  {
    title: "Open File or Directory",
    description: "Opens a file or directory with default app",
    command: "termux-open [file/path]",
    category: "File & Storage",
  },
  {
    title: "Open URL",
    description: "Opens the URL in default browser",
    command: "termux-open-url [URL]",
    category: "File & Storage",
  },
  {
    title: "Share Content",
    description: "Shares files or text using Android share menu",
    command: "termux-share",
    category: "File & Storage",
  },
  {
    title: "List Storage Volumes",
    description: "Lists all available storage volumes",
    command: "termux-storage-list",
    category: "File & Storage",
  },
  {
    title: "Get Storage Info",
    description: "Gets storage info about a path",
    command: "termux-storage-get [path]",
    category: "File & Storage",
  },

  // 🔔 System & Notification
  {
    title: "Show Toast Message",
    description: "Shows a toast message",
    command: "termux-toast [message]",
    category: "System & Notification",
  },
  {
    title: "Send Notification",
    description: "Sends a system notification",
    command: "termux-notification",
    category: "System & Notification",
  },
  {
    title: "Vibrate Device",
    description: "Vibrates the device",
    command: "termux-vibrate",
    category: "System & Notification",
  },
  {
    title: "Keep Device Awake",
    description: "Keeps device awake",
    command: "termux-wake-lock",
    category: "System & Notification",
  },
  {
    title: "Allow Sleep",
    description: "Allows device to sleep",
    command: "termux-wake-unlock",
    category: "System & Notification",
  },

  // 📋 Clipboard
  {
    title: "Get Clipboard",
    description: "Gets contents of clipboard",
    command: "termux-clipboard-get",
    category: "Clipboard",
  },
  {
    title: "Set Clipboard",
    description: "Sets clipboard contents",
    command: "termux-clipboard-set [text]",
    category: "Clipboard",
  },

  // 📸 Camera & Media
  {
    title: "Take Photo",
    description: "Takes a photo and saves it",
    command: "termux-camera-photo [output_file]",
    category: "Camera & Media",
  },
  {
    title: "Record Video",
    description: "Records a video and saves it",
    command: "termux-camera-record [output_file]",
    category: "Camera & Media",
  },
  {
    title: "Play Media",
    description: "Plays media file",
    command: "termux-media-player play [file]",
    category: "Camera & Media",
  },
  {
    title: "Pause Media",
    description: "Pauses playing media",
    command: "termux-media-player pause",
    category: "Camera & Media",
  },
  {
    title: "Stop Media",
    description: "Stops media playback",
    command: "termux-media-player stop",
    category: "Camera & Media",
  },
  {
    title: "Seek Media",
    description: "Seeks media to given time",
    command: "termux-media-player seek [time]",
    category: "Camera & Media",
  },
  {
    title: "Load Playlist",
    description: "Loads playlist from file",
    command: "termux-media-player playlist [file]",
    category: "Camera & Media",
  },

  // 📶 Wi-Fi & Telephony
  {
    title: "Toggle Wi-Fi",
    description: "Enable or disable Wi-Fi",
    command: "termux-wifi-enable [true/false]",
    category: "Wi-Fi & Telephony",
  },
  {
    title: "Wi-Fi Connection Info",
    description: "Show Wi-Fi connection info",
    command: "termux-wifi-connectioninfo",
    category: "Wi-Fi & Telephony",
  },
  {
    title: "IP Info",
    description: "Display IP address info",
    command: "termux-wifi-ipinfo",
    category: "Wi-Fi & Telephony",
  },
  {
    title: "Scan Wi-Fi",
    description: "Scan Wi-Fi networks",
    command: "termux-wifi-scaninfo",
    category: "Wi-Fi & Telephony",
  },
  {
    title: "Device Info",
    description: "Device SIM and network info",
    command: "termux-telephony-deviceinfo",
    category: "Wi-Fi & Telephony",
  },
  {
    title: "Signal Strength",
    description: "Signal strength info",
    command: "termux-telephony-signalstrength",
    category: "Wi-Fi & Telephony",
  },
  {
    title: "Device IMEI",
    description: "Show device IMEI",
    command: "termux-telephony-imei",
    category: "Wi-Fi & Telephony",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Package Management": <Package className="w-5 h-5" />,
  "File & Storage": <Folder className="w-5 h-5" />,
  "System & Notification": <Bell className="w-5 h-5" />,
  "Clipboard": <Clipboard className="w-5 h-5" />,
  "Camera & Media": <Camera className="w-5 h-5" />,
  "Wi-Fi & Telephony": <Wifi className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Package Management": "from-blue-500 to-cyan-600",
  "File & Storage": "from-purple-500 to-pink-600",
  "System & Notification": "from-orange-500 to-red-600",
  "Clipboard": "from-green-500 to-emerald-600",
  "Camera & Media": "from-yellow-500 to-orange-600",
  "Wi-Fi & Telephony": "from-indigo-500 to-purple-600",
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

export default function LessonPage(): JSX.Element {
  const categories = Array.from(new Set(lesson1Commands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">LESSON 1</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Core Commands
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Master the essential Termux commands for package management, file operations, system control, and device interaction.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = lesson1Commands.filter((cmd) => cmd.category === category);
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
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li>• Use <code className="bg-background px-2 py-1 rounded text-primary font-mono">pkg update</code> regularly to keep packages current</li>
            <li>• Always <code className="bg-background px-2 py-1 rounded text-primary font-mono">pkg upgrade</code> after updating for security patches</li>
            <li>• Click the copy button to quickly copy commands to your clipboard</li>
            <li>• Replace <code className="bg-background px-2 py-1 rounded text-primary font-mono">[parameter]</code> with actual values when executing commands</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
