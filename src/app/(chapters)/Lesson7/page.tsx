"use client";

import { Copy, Check, Package, Settings, Lock, Wifi, Share2, HardDrive } from "lucide-react";
import { useState } from "react";

interface Command {
  command: string;
  description: string;
  category: string;
}

const lesson7Commands: Command[] = [
  // 📦 Repository & Package Management
  {
    command: "termux-add-repo [repository]",
    description: "Adds a new repository to the list of available repositories.",
    category: "Repository & Packages",
  },
  {
    command: "termux-create-package [package_name]",
    description: "Creates a new package with the specified name.",
    category: "Repository & Packages",
  },
  {
    command: "termux-package-info [package_name]",
    description: "Displays information about the specified package.",
    category: "Repository & Packages",
  },
  {
    command: "termux-package-list [options]",
    description: "Lists installed packages.",
    category: "Repository & Packages",
  },

  // 🔐 System Security & Permissions
  {
    command: "termux-fix-permissions [directory/file]",
    description: "Fixes permissions for the specified directory or file.",
    category: "Security & Permissions",
  },
  {
    command: "termux-fix-shebang [file]",
    description: "Fixes the shebang of a script file to make it executable.",
    category: "Security & Permissions",
  },
  {
    command: "termux-fingerprint [options]",
    description: "Manages fingerprints for SSH connections.",
    category: "Security & Permissions",
  },
  {
    command: "termux-lock-settings",
    description: "Locks Termux settings with a password.",
    category: "Security & Permissions",
  },
  {
    command: "termux-sudo",
    description: "Runs a command with superuser privileges.",
    category: "Security & Permissions",
  },

  // ⚙️ Configuration & Settings
  {
    command: "termux-chroot [directory]",
    description: "Changes the root directory for the current session.",
    category: "Configuration",
  },
  {
    command: "termux-info",
    description: "Displays system information.",
    category: "Configuration",
  },
  {
    command: "termux-reload-settings",
    description: "Reloads Termux settings from disk.",
    category: "Configuration",
  },
  {
    command: "termux-reload-style",
    description: "Reloads the Termux console style settings.",
    category: "Configuration",
  },
  {
    command: "termux-reload-fonts",
    description: "Reloads the Termux console font settings.",
    category: "Configuration",
  },
  {
    command: "termux-reload-properties",
    description: "Reloads the Termux console properties settings.",
    category: "Configuration",
  },
  {
    command: "termux-reset-settings",
    description: "Resets Termux settings to default values.",
    category: "Configuration",
  },
  {
    command: "termux-reset",
    description: "Resets Termux to a clean state.",
    category: "Configuration",
  },

  // 🌐 Network & Connectivity
  {
    command: "termux-wifi-connect [SSID] [password]",
    description: "Connects to the specified Wi-Fi network.",
    category: "Network & Connectivity",
  },
  {
    command: "termux-wifi-enable [true/false]",
    description: "Enables or disables Wi-Fi.",
    category: "Network & Connectivity",
  },
  {
    command: "termux-wifi-ipinfo",
    description: "Displays information about the device's IP address.",
    category: "Network & Connectivity",
  },
  {
    command: "termux-wifi-scaninfo",
    description: "Scans for Wi-Fi networks and displays information about them.",
    category: "Network & Connectivity",
  },
  {
    command: "termux-wifi-tether",
    description: "Tethers the device's Wi-Fi connection.",
    category: "Network & Connectivity",
  },
  {
    command: "termux-wifi-toggle",
    description: "Toggles the Wi-Fi connection.",
    category: "Network & Connectivity",
  },
  {
    command: "termux-wifi-connectioninfo",
    description: "Shows information about the current Wi-Fi connection.",
    category: "Network & Connectivity",
  },

  // 💾 Storage & Files
  {
    command: "termux-setup-storage",
    description: "Sets up storage for Termux.",
    category: "Storage & Files",
  },
  {
    command: "termux-tmpdir",
    description: "Prints the path to the temporary directory.",
    category: "Storage & Files",
  },
  {
    command: "termux-open [file/path]",
    description: "Opens a file or directory with the default app.",
    category: "Storage & Files",
  },
  {
    command: "termux-open-url [URL]",
    description: "Opens the specified URL in the default browser.",
    category: "Storage & Files",
  },

  // 📢 Notifications & System
  {
    command: "termux-notify",
    description: "Sends a notification to the notification bar.",
    category: "Notifications & System",
  },
  {
    command: "termux-share",
    description: "Shares files or text using the Android share menu.",
    category: "Notifications & System",
  },
  {
    command: "termux-wallpaper [file]",
    description: "Sets the device's wallpaper to the specified image file.",
    category: "Notifications & System",
  },
  {
    command: "termux-wake-lock",
    description: "Keeps the device awake until explicitly released.",
    category: "Notifications & System",
  },
  {
    command: "termux-wake-unlock",
    description: "Releases the wake lock on the device.",
    category: "Notifications & System",
  },
  {
    command: "termux-telephony-configure",
    description: "Configures telephony settings.",
    category: "Notifications & System",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Repository & Packages": <Package className="w-5 h-5" />,
  "Security & Permissions": <Lock className="w-5 h-5" />,
  "Configuration": <Settings className="w-5 h-5" />,
  "Network & Connectivity": <Wifi className="w-5 h-5" />,
  "Storage & Files": <HardDrive className="w-5 h-5" />,
  "Notifications & System": <Share2 className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Repository & Packages": "from-blue-500 to-cyan-600",
  "Security & Permissions": "from-red-500 to-pink-600",
  "Configuration": "from-purple-500 to-indigo-600",
  "Network & Connectivity": "from-green-500 to-emerald-600",
  "Storage & Files": "from-yellow-500 to-orange-600",
  "Notifications & System": "from-orange-500 to-red-600",
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

export default function Lesson7Page(): JSX.Element {
  const categories = Array.from(new Set(lesson7Commands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">LESSON 7</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            System Administration
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Master system administration commands for package management, security, configuration, storage, and network management.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = lesson7Commands.filter((cmd) => cmd.category === category);
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
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">💡 Admin Tips</h3>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li>• Use package management commands to maintain a clean and updated system</li>
            <li>• Always backup your settings before using reset commands</li>
            <li>• Security commands like fingerprint and lock-settings protect your sensitive data</li>
            <li>• Reload commands apply configuration changes without restarting Termux</li>
            <li>• Use termux-sudo carefully - it grants elevated privileges to scripts</li>
            <li>• Storage and file commands manage access to device resources</li>
            <li>• Network commands can be combined with automation for intelligent connectivity</li>
            <li>• Wake-lock commands are useful for long-running background tasks</li>
            <li>• Test admin commands in safe environments before production deployment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
