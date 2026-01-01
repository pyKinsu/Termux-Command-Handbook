"use client";

import { Copy, Check, Clipboard, Smartphone, Camera, MapPin, Bell, Music, Wifi, MessageSquare, Phone, Users } from "lucide-react";
import { useState } from "react";

interface Command {
  title: string;
  description: string;
  command: string;
  category: string;
}

const lesson6Commands: Command[] = [
  // 📋 Clipboard & Sharing
  {
    title: "Get Clipboard Text",
    description: "Retrieves the current contents of the clipboard.",
    command: "termux-clipboard-get",
    category: "Clipboard & Sharing",
  },
  {
    title: "Set Clipboard Text",
    description: "Sets the clipboard contents to the specified text.",
    command: "termux-clipboard-set 'Hello from Termux!'",
    category: "Clipboard & Sharing",
  },
  {
    title: "Share Content",
    description: "Shares files or text using the Android share menu.",
    command: "termux-share -a send -c 'Check this out!'",
    category: "Clipboard & Sharing",
  },

  // 📱 Device Info & Control
  {
    title: "System Info",
    description: "Displays Termux environment debug information.",
    command: "termux-info",
    category: "Device Info",
  },
  {
    title: "CPU Info",
    description: "Displays information about the device's CPU.",
    command: "termux-cpu-info",
    category: "Device Info",
  },
  {
    title: "Get Location",
    description: "Retrieves the device's current GPS location.",
    command: "termux-location",
    category: "Device Info",
  },

  // 📸 Media & Camera
  {
    title: "Camera Photo",
    description: "Takes a photo using the device's camera.",
    command: "termux-camera-photo -c 0 photo.jpg",
    category: "Media & Camera",
  },
  {
    title: "Play Media",
    description: "Plays an audio file using Termux's media player.",
    command: "termux-media-player play file.mp3",
    category: "Media & Camera",
  },

  // 🔔 Notifications
  {
    title: "Send Notification",
    description: "Sends a notification to the Android system tray.",
    command: "termux-notification -t 'Hi' -c 'This is from Termux'",
    category: "Notifications",
  },
  {
    title: "Remove Notification",
    description: "Removes a previously sent notification.",
    command: "termux-notification-remove 1",
    category: "Notifications",
  },

  // 🌐 Network & Connectivity
  {
    title: "Scan Wi-Fi",
    description: "Scans and displays nearby Wi-Fi networks.",
    command: "termux-wifi-scaninfo",
    category: "Network & Web",
  },
  {
    title: "Open URL",
    description: "Opens a URL in the device's default browser.",
    command: "termux-open-url https://example.com",
    category: "Network & Web",
  },

  // 📞 Telephony
  {
    title: "Send SMS",
    description: "Sends an SMS message to a phone number.",
    command: "termux-sms-send -n 1234567890 'Hello!'",
    category: "Telephony",
  },
  {
    title: "Get Call Log",
    description: "Lists recent call history from the device.",
    command: "termux-call-log",
    category: "Telephony",
  },

  // 👥 Contacts
  {
    title: "Access Contact List",
    description: "Lists all saved contacts.",
    command: "termux-contact-list",
    category: "Contacts",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Clipboard & Sharing": <Clipboard className="w-5 h-5" />,
  "Device Info": <Smartphone className="w-5 h-5" />,
  "Media & Camera": <Camera className="w-5 h-5" />,
  "Notifications": <Bell className="w-5 h-5" />,
  "Network & Web": <Wifi className="w-5 h-5" />,
  "Telephony": <Phone className="w-5 h-5" />,
  "Contacts": <Users className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Clipboard & Sharing": "from-blue-500 to-cyan-600",
  "Device Info": "from-purple-500 to-pink-600",
  "Media & Camera": "from-yellow-500 to-orange-600",
  "Notifications": "from-red-500 to-pink-600",
  "Network & Web": "from-indigo-500 to-purple-600",
  "Telephony": "from-green-500 to-emerald-600",
  "Contacts": "from-orange-500 to-red-600",
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

export default function Lesson6Page(): JSX.Element {
  const categories = Array.from(new Set(lesson6Commands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">LESSON 6</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Developer Commands
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Essential developer commands for clipboard management, device control, media handling, notifications, and system interaction.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = lesson6Commands.filter((cmd) => cmd.category === category);
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
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">💡 Developer Tips</h3>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li>• Use clipboard commands to integrate with Android clipboard for seamless data transfer</li>
            <li>• Device info commands help you gather system information for app compatibility checks</li>
            <li>• Media player commands enable audio playback automation in your scripts</li>
            <li>• Notifications provide user feedback without opening additional apps</li>
            <li>• SMS and call log commands allow programmatic access to device communication history</li>
            <li>• Location commands can be used in location-based automation workflows</li>
            <li>• Always request appropriate permissions before accessing sensitive device data</li>
            <li>• Combine multiple commands to create powerful mobile automation solutions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
