"use client";

import { Copy, Check, Cpu, Camera, MessageSquare, Wifi, Bell, Download, MapPin, Zap } from "lucide-react";
import { useState } from "react";

interface Command {
  title: string;
  description: string;
  command: string;
  category: string;
}

const expertCommands: Command[] = [
  // ⚡ Core System & API
  {
    title: "Access APIs",
    description: "Allows access to various device APIs from Termux shell scripts.",
    command: "termux-api",
    category: "Core System & API",
  },
  {
    title: "System Info",
    description: "Displays system information.",
    command: "termux-info",
    category: "Core System & API",
  },
  {
    title: "Job Scheduler",
    description: "Schedules jobs to run in the background.",
    command: "termux-job-scheduler [options]",
    category: "Core System & API",
  },
  {
    title: "Battery Status",
    description: "Shows battery information such as level, status, health, etc.",
    command: "termux-battery-status",
    category: "Core System & API",
  },
  {
    title: "Volume Control",
    description: "Controls volume settings.",
    command: "termux-volume",
    category: "Core System & API",
  },

  // 📸 Camera & Media
  {
    title: "Camera Info",
    description: "Provides information about the device's camera(s).",
    command: "termux-camera-info",
    category: "Camera & Media",
  },
  {
    title: "Media Player",
    description: "Controls media playback.",
    command: "termux-media-player",
    category: "Camera & Media",
  },
  {
    title: "Media Scan",
    description: "Scans the specified path for media files.",
    command: "termux-media-scan [path]",
    category: "Camera & Media",
  },

  // 📋 Clipboard & Contacts
  {
    title: "Clipboard Get",
    description: "Retrieves the current contents of the clipboard.",
    command: "termux-clipboard-get",
    category: "Clipboard & Contacts",
  },
  {
    title: "Clipboard Set",
    description: "Sets the clipboard contents to the specified text.",
    command: "termux-clipboard-set [text]",
    category: "Clipboard & Contacts",
  },
  {
    title: "Contact List",
    description: "Lists all contacts stored on the device.",
    command: "termux-contact-list",
    category: "Clipboard & Contacts",
  },

  // 📞 Telephony & SMS
  {
    title: "View SMS Inbox",
    description: "Lists received SMS messages.",
    command: "termux-sms-inbox",
    category: "Telephony & SMS",
  },
  {
    title: "Send SMS",
    description: "Sends an SMS to the specified number with the given message.",
    command: "termux-sms-send -n [number] [message]",
    category: "Telephony & SMS",
  },
  {
    title: "View SMS",
    description: "Displays the contents of the specified SMS message.",
    command: "termux-sms-view [message_id]",
    category: "Telephony & SMS",
  },
  {
    title: "Cell Info",
    description: "Shows information about the current cellular network.",
    command: "termux-telephony-cellinfo",
    category: "Telephony & SMS",
  },
  {
    title: "Device Info",
    description: "Shows device-specific information.",
    command: "termux-telephony-deviceinfo",
    category: "Telephony & SMS",
  },
  {
    title: "IMEI",
    description: "Shows the IMEI number of the device.",
    command: "termux-telephony-imei",
    category: "Telephony & SMS",
  },
  {
    title: "Signal Strength",
    description: "Shows signal strength information.",
    command: "termux-telephony-signalstrength",
    category: "Telephony & SMS",
  },

  // 🌐 Network & Connectivity
  {
    title: "Connect to Wi-Fi",
    description: "Connects to the specified Wi-Fi network.",
    command: "termux-wifi-connect [SSID] [password]",
    category: "Network & Connectivity",
  },
  {
    title: "Enable/Disable Wi-Fi",
    description: "Enables or disables Wi-Fi.",
    command: "termux-wifi-enable [true/false]",
    category: "Network & Connectivity",
  },
  {
    title: "Wi-Fi IP Info",
    description: "Displays information about the device's IP address.",
    command: "termux-wifi-ipinfo",
    category: "Network & Connectivity",
  },
  {
    title: "Wi-Fi Scan Info",
    description: "Scans for Wi-Fi networks and displays information about them.",
    command: "termux-wifi-scaninfo",
    category: "Network & Connectivity",
  },

  // 🔔 Notifications & Audio
  {
    title: "Send Notification",
    description: "Sends a notification to the notification bar.",
    command: "termux-notification",
    category: "Notifications & Audio",
  },
  {
    title: "Remove Notification",
    description: "Removes a notification with the specified ID.",
    command: "termux-notification-remove [id]",
    category: "Notifications & Audio",
  },
  {
    title: "List Notifications",
    description: "Lists all active notifications.",
    command: "termux-notification-list",
    category: "Notifications & Audio",
  },
  {
    title: "Remove All Notifications",
    description: "Removes all active notifications.",
    command: "termux-notification-remove-all",
    category: "Notifications & Audio",
  },
  {
    title: "Text to Speech",
    description: "Converts text to speech and speaks it aloud.",
    command: "termux-tts-speak [text]",
    category: "Notifications & Audio",
  },

  // 📥 File & Content Management
  {
    title: "Download File",
    description: "Downloads a file from the specified URL.",
    command: "termux-download [URL]",
    category: "File & Content",
  },
  {
    title: "Open URL",
    description: "Opens the specified URL in the default app.",
    command: "termux-url-opener [URL]",
    category: "File & Content",
  },
  {
    title: "Open in Browser",
    description: "Opens the specified URL in the default browser.",
    command: "termux-open-url [URL]",
    category: "File & Content",
  },
  {
    title: "Open File/Path",
    description: "Opens a file or directory with the default app.",
    command: "termux-open [file/path]",
    category: "File & Content",
  },
  {
    title: "Share Content",
    description: "Shares files or text using the Android share menu.",
    command: "termux-share",
    category: "File & Content",
  },
  {
    title: "Set Wallpaper",
    description: "Sets the device's wallpaper to the specified image file.",
    command: "termux-wallpaper [file]",
    category: "File & Content",
  },

  // 🎛️ Advanced & Hardware
  {
    title: "Location",
    description: "Retrieves the device's current location.",
    command: "termux-location",
    category: "Advanced & Hardware",
  },
  {
    title: "Infrared Transmit",
    description: "Transmits an infrared pattern at the specified frequency.",
    command: "termux-infrared-transmit [frequency] [pattern]",
    category: "Advanced & Hardware",
  },
  {
    title: "Dialog Box",
    description: "Displays a customizable dialog box.",
    command: "termux-dialog",
    category: "Advanced & Hardware",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Core System & API": <Cpu className="w-5 h-5" />,
  "Camera & Media": <Camera className="w-5 h-5" />,
  "Clipboard & Contacts": <Copy className="w-5 h-5" />,
  "Telephony & SMS": <MessageSquare className="w-5 h-5" />,
  "Network & Connectivity": <Wifi className="w-5 h-5" />,
  "Notifications & Audio": <Bell className="w-5 h-5" />,
  "File & Content": <Download className="w-5 h-5" />,
  "Advanced & Hardware": <Zap className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Core System & API": "from-cyan-500 to-blue-600",
  "Camera & Media": "from-pink-500 to-rose-600",
  "Clipboard & Contacts": "from-blue-500 to-indigo-600",
  "Telephony & SMS": "from-green-500 to-teal-600",
  "Network & Connectivity": "from-purple-500 to-indigo-600",
  "Notifications & Audio": "from-orange-500 to-red-600",
  "File & Content": "from-yellow-500 to-orange-600",
  "Advanced & Hardware": "from-red-500 to-pink-600",
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

export default function ExpertCommandsPage(): JSX.Element {
  const categories = Array.from(new Set(expertCommands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">LESSON 4</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Expert Commands
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Unlock the full potential of Termux with expert-level commands for complete device integration, automation, and system control.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = expertCommands.filter((cmd) => cmd.category === category);
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
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">💡 Expert Tips</h3>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li>• Expert commands provide direct access to device hardware and system resources</li>
            <li>• Always ensure proper permissions are granted in device settings before using advanced features</li>
            <li>• Use <code className="bg-background px-2 py-1 rounded text-primary font-mono">termux-api</code> for comprehensive API access and automation</li>
            <li>• Location services must be enabled for GPS-based commands to function</li>
            <li>• Combine multiple commands in shell scripts for powerful automation workflows</li>
            <li>• Test commands on non-critical data first to understand their behavior and impact</li>
            <li>• Some features require Termux:API app to be installed for full capability</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
