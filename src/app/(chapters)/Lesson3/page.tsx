"use client";

import { Copy, Check, Zap, Camera, Phone, MessageSquare, Wifi, Bell, Download, MapPin, Radio } from "lucide-react";
import { useState } from "react";

interface Command {
  title: string;
  description: string;
  category: string;
}

const advancedCommands: Command[] = [
  // ⚡ Core System
  {
    title: "termux-api",
    description: "Access various Android APIs from Termux scripts.",
    category: "Core System",
  },
  {
    title: "termux-battery-status",
    description: "Get battery status including level and health.",
    category: "Core System",
  },
  {
    title: "termux-info",
    description: "Display general system information.",
    category: "Core System",
  },
  {
    title: "termux-job-scheduler [options]",
    description: "Schedule background jobs.",
    category: "Core System",
  },

  // 📸 Camera & Media
  {
    title: "termux-camera-info",
    description: "Get information about available cameras.",
    category: "Camera & Media",
  },
  {
    title: "termux-media-player",
    description: "Control audio/video media playback.",
    category: "Camera & Media",
  },
  {
    title: "termux-media-scan [path]",
    description: "Scan for media files at the specified path.",
    category: "Camera & Media",
  },

  // 📞 Telephony & SMS
  {
    title: "termux-call-log",
    description: "View call logs (incoming/outgoing/missed).",
    category: "Telephony & SMS",
  },
  {
    title: "termux-telephony-cellinfo",
    description: "Cellular network cell info.",
    category: "Telephony & SMS",
  },
  {
    title: "termux-telephony-deviceinfo",
    description: "Device and SIM card info.",
    category: "Telephony & SMS",
  },
  {
    title: "termux-telephony-imei",
    description: "Show device IMEI number.",
    category: "Telephony & SMS",
  },
  {
    title: "termux-telephony-signalstrength",
    description: "Get mobile network signal strength.",
    category: "Telephony & SMS",
  },
  {
    title: "termux-sms-inbox",
    description: "List received SMS messages.",
    category: "Telephony & SMS",
  },
  {
    title: "termux-sms-send -n [number] [message]",
    description: "Send SMS to number.",
    category: "Telephony & SMS",
  },
  {
    title: "termux-sms-view [message_id]",
    description: "View details of an SMS message.",
    category: "Telephony & SMS",
  },

  // 📋 Clipboard & Contacts
  {
    title: "termux-clipboard-get",
    description: "Get current clipboard contents.",
    category: "Clipboard & Contacts",
  },
  {
    title: "termux-clipboard-set [text]",
    description: "Set clipboard to specified text.",
    category: "Clipboard & Contacts",
  },
  {
    title: "termux-contact-list",
    description: "List all contacts from device.",
    category: "Clipboard & Contacts",
  },

  // 🌐 Network & Connectivity
  {
    title: "termux-wifi-connect [SSID] [password]",
    description: "Connect to a Wi-Fi network.",
    category: "Network & Connectivity",
  },
  {
    title: "termux-wifi-enable [true/false]",
    description: "Enable or disable Wi-Fi.",
    category: "Network & Connectivity",
  },
  {
    title: "termux-wifi-ipinfo",
    description: "Get current IP address information.",
    category: "Network & Connectivity",
  },
  {
    title: "termux-wifi-scaninfo",
    description: "Scan and display nearby Wi-Fi networks.",
    category: "Network & Connectivity",
  },

  // 🔔 Notifications & Audio
  {
    title: "termux-notification",
    description: "Send a custom notification.",
    category: "Notifications & Audio",
  },
  {
    title: "termux-notification-list",
    description: "List all active notifications.",
    category: "Notifications & Audio",
  },
  {
    title: "termux-notification-remove [id]",
    description: "Remove notification with specific ID.",
    category: "Notifications & Audio",
  },
  {
    title: "termux-notification-remove-all",
    description: "Remove all active notifications.",
    category: "Notifications & Audio",
  },
  {
    title: "termux-tts-speak [text]",
    description: "Text-to-speech: speak text aloud.",
    category: "Notifications & Audio",
  },
  {
    title: "termux-volume",
    description: "Control volume level of device streams.",
    category: "Notifications & Audio",
  },

  // 📥 File & Content Management
  {
    title: "termux-download [URL]",
    description: "Download file from specified URL.",
    category: "File & Content",
  },
  {
    title: "termux-open [file/path]",
    description: "Open file or directory with default app.",
    category: "File & Content",
  },
  {
    title: "termux-open-url [URL]",
    description: "Open URL in browser.",
    category: "File & Content",
  },
  {
    title: "termux-url-opener [URL]",
    description: "Open URL using default handler.",
    category: "File & Content",
  },
  {
    title: "termux-share",
    description: "Share file or content via Android share menu.",
    category: "File & Content",
  },
  {
    title: "termux-wallpaper [file]",
    description: "Set the wallpaper to the given image.",
    category: "File & Content",
  },

  // 🎛️ Advanced & Hardware
  {
    title: "termux-location",
    description: "Get current device location using GPS/network.",
    category: "Advanced & Hardware",
  },
  {
    title: "termux-infrared-transmit [frequency] [pattern]",
    description: "Send IR signals.",
    category: "Advanced & Hardware",
  },
  {
    title: "termux-dialog",
    description: "Show custom interactive dialog boxes.",
    category: "Advanced & Hardware",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Core System": <Zap className="w-5 h-5" />,
  "Camera & Media": <Camera className="w-5 h-5" />,
  "Telephony & SMS": <Phone className="w-5 h-5" />,
  "Clipboard & Contacts": <Copy className="w-5 h-5" />,
  "Network & Connectivity": <Wifi className="w-5 h-5" />,
  "Notifications & Audio": <Bell className="w-5 h-5" />,
  "File & Content": <Download className="w-5 h-5" />,
  "Advanced & Hardware": <Radio className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Core System": "from-yellow-500 to-orange-600",
  "Camera & Media": "from-pink-500 to-red-600",
  "Telephony & SMS": "from-green-500 to-emerald-600",
  "Clipboard & Contacts": "from-blue-500 to-cyan-600",
  "Network & Connectivity": "from-indigo-500 to-purple-600",
  "Notifications & Audio": "from-purple-500 to-pink-600",
  "File & Content": "from-orange-500 to-yellow-600",
  "Advanced & Hardware": "from-teal-500 to-blue-600",
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

export default function Lesson3Page(): JSX.Element {
  const categories = Array.from(new Set(advancedCommands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">LESSON 3</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Advanced Commands
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Master powerful advanced Termux commands for system control, device hardware access, and complex automation workflows.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = advancedCommands.filter((cmd) => cmd.category === category);
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
                          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors flex-1 font-mono">
                            {cmd.title}
                          </h3>
                          <CopyButton text={cmd.title} />
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground">
                          {cmd.description}
                        </p>

                        {/* Command Box */}
                        <div className="mt-auto pt-3 border-t border-border">
                          <div className="bg-background border border-border rounded-lg p-3 font-mono text-xs sm:text-sm text-primary overflow-x-auto">
                            <span className="text-muted-foreground">$ </span>
                            {cmd.title}
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
            <li>• Advanced commands require appropriate permissions - always check device settings</li>
            <li>• Use <code className="bg-background px-2 py-1 rounded text-primary font-mono">termux-info</code> to verify your Termux version and capabilities</li>
            <li>• Battery status and hardware access commands may drain device resources</li>
            <li>• Location and GPS commands require location services enabled</li>
            <li>• Some commands need Termux:API app installed for full functionality</li>
            <li>• Test advanced automation scripts in safe environments first</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
