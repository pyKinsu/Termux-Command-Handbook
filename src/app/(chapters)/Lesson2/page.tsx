"use client";

import { Copy, Check, Mic, Camera, MessageSquare, Wifi, Radio, Volume2, Lightbulb } from "lucide-react";
import { useState } from "react";

interface Command {
  title: string;
  description: string;
  command: string;
  category: string;
}

const lesson2Commands: Command[] = [
  // 🎵 Audio & Mic
  {
    title: "Audio Info",
    description: "Displays information about the audio system.",
    command: "termux-audio-info",
    category: "Audio & Microphone",
  },
  {
    title: "Play Audio",
    description: "Plays the specified audio file.",
    command: "termux-audio-play [file]",
    category: "Audio & Microphone",
  },
  {
    title: "Record Audio",
    description: "Records audio and saves it to the specified file.",
    command: "termux-audio-record [output_file]",
    category: "Audio & Microphone",
  },
  {
    title: "Record Mic",
    description: "Records audio using the device's microphone.",
    command: "termux-microphone-record [output_file]",
    category: "Audio & Microphone",
  },

  // 📞 Call & SMS
  {
    title: "Show Call Log",
    description: "Lists the call log.",
    command: "termux-call-log",
    category: "Call & SMS",
  },
  {
    title: "Call Log by Type",
    description: "Lists entries by type (incoming, outgoing, missed).",
    command: "termux-call-log -t [type]",
    category: "Call & SMS",
  },
  {
    title: "Limit Call Log",
    description: "Limits the number of call log entries shown.",
    command: "termux-call-log -l [limit]",
    category: "Call & SMS",
  },
  {
    title: "List SMS",
    description: "Lists all SMS messages.",
    command: "termux-sms-list",
    category: "Call & SMS",
  },
  {
    title: "SMS Inbox",
    description: "Shows received messages.",
    command: "termux-sms-inbox",
    category: "Call & SMS",
  },
  {
    title: "Send SMS",
    description: "Sends SMS to number.",
    command: "termux-sms-send -n [number] [message]",
    category: "Call & SMS",
  },
  {
    title: "View SMS",
    description: "Displays specific message.",
    command: "termux-sms-view [message_id]",
    category: "Call & SMS",
  },

  // 📸 Camera & Media
  {
    title: "Camera Info",
    description: "Displays camera info.",
    command: "termux-camera-info",
    category: "Camera & Media",
  },
  {
    title: "Take Photo",
    description: "Takes a photo and saves it.",
    command: "termux-camera-photo [output_file]",
    category: "Camera & Media",
  },
  {
    title: "Record Video",
    description: "Records a video and saves it.",
    command: "termux-camera-record [output_file]",
    category: "Camera & Media",
  },
  {
    title: "Snapshot",
    description: "Takes a camera snapshot.",
    command: "termux-camera-snapshot [output_file]",
    category: "Camera & Media",
  },
  {
    title: "Camera Preview",
    description: "Opens a live camera preview.",
    command: "termux-camera-view",
    category: "Camera & Media",
  },
  {
    title: "Scan Media",
    description: "Scans path for media.",
    command: "termux-media-scan [path]",
    category: "Camera & Media",
  },

  // 📋 Clipboard & Contacts
  {
    title: "Get Clipboard",
    description: "Retrieves clipboard contents.",
    command: "termux-clipboard-get",
    category: "Clipboard & Contacts",
  },
  {
    title: "Set Clipboard",
    description: "Sets clipboard to specified text.",
    command: "termux-clipboard-set [text]",
    category: "Clipboard & Contacts",
  },
  {
    title: "Get Contact",
    description: "Retrieves a contact's info.",
    command: "termux-contact-get [contact_name]",
    category: "Clipboard & Contacts",
  },
  {
    title: "List Contacts",
    description: "Lists all contacts.",
    command: "termux-contact-list",
    category: "Clipboard & Contacts",
  },

  // 🌐 Network & Connectivity
  {
    title: "Connect Wi-Fi",
    description: "Connects to a Wi-Fi network.",
    command: "termux-wifi-connect [SSID] [password]",
    category: "Network & Connectivity",
  },
  {
    title: "Toggle Wi-Fi",
    description: "Enables or disables Wi-Fi.",
    command: "termux-wifi-enable [true/false]",
    category: "Network & Connectivity",
  },
  {
    title: "Wi-Fi IP Info",
    description: "Displays IP address info.",
    command: "termux-wifi-ipinfo",
    category: "Network & Connectivity",
  },
  {
    title: "Wi-Fi Scan",
    description: "Scans nearby networks.",
    command: "termux-wifi-scaninfo",
    category: "Network & Connectivity",
  },
  {
    title: "Cell Info",
    description: "Shows cellular network info.",
    command: "termux-telephony-cellinfo",
    category: "Network & Connectivity",
  },
  {
    title: "Device Info",
    description: "Shows telephony device info.",
    command: "termux-telephony-deviceinfo",
    category: "Network & Connectivity",
  },
  {
    title: "IMEI",
    description: "Displays device IMEI.",
    command: "termux-telephony-imei",
    category: "Network & Connectivity",
  },
  {
    title: "Signal Strength",
    description: "Shows signal strength.",
    command: "termux-telephony-signalstrength",
    category: "Network & Connectivity",
  },

  // 📁 Files & Editor
  {
    title: "Download File",
    description: "Downloads a file from URL.",
    command: "termux-download [URL]",
    category: "Files & Editor",
  },
  {
    title: "Open File Editor",
    description: "Opens a file in text editor.",
    command: "termux-file-editor [file]",
    category: "Files & Editor",
  },
  {
    title: "Open Editable File",
    description: "Opens file in editable editor.",
    command: "termux-file-editor-editable [file]",
    category: "Files & Editor",
  },
  {
    title: "Fix Shebang",
    description: "Fixes shebang to make script executable.",
    command: "termux-fix-shebang [file]",
    category: "Files & Editor",
  },
  {
    title: "Open File",
    description: "Opens file or dir.",
    command: "termux-open [file/path]",
    category: "Files & Editor",
  },
  {
    title: "Open URL",
    description: "Opens link in browser.",
    command: "termux-open-url [URL]",
    category: "Files & Editor",
  },
  {
    title: "Upload File",
    description: "Uploads file to destination.",
    command: "termux-upload [source_file] [destination_directory]",
    category: "Files & Editor",
  },

  // 🔊 System & Notifications
  {
    title: "Send Notification",
    description: "Sends a notification.",
    command: "termux-notification",
    category: "System & Notifications",
  },
  {
    title: "List TTS Engines",
    description: "Lists TTS engines.",
    command: "termux-tts-engines",
    category: "System & Notifications",
  },
  {
    title: "Speak Text",
    description: "Speaks text aloud.",
    command: "termux-tts-speak [text]",
    category: "System & Notifications",
  },
  {
    title: "Volume Control",
    description: "Controls system volume.",
    command: "termux-volume",
    category: "System & Notifications",
  },
  {
    title: "Flashlight",
    description: "Turns flashlight on/off.",
    command: "termux-torch [true/false]",
    category: "System & Notifications",
  },
  {
    title: "System Info",
    description: "Displays system info.",
    command: "termux-info",
    category: "System & Notifications",
  },

  // 🎛️ Advanced Features
  {
    title: "Broadcast Intent",
    description: "Sends a broadcast intent.",
    command: "termux-am broadcast -a [action]",
    category: "Advanced Features",
  },
  {
    title: "IR Frequencies",
    description: "Lists infrared frequencies.",
    command: "termux-infrared-frequencies",
    category: "Advanced Features",
  },
  {
    title: "IR Transmit",
    description: "Transmits IR pattern.",
    command: "termux-infrared-transmit [frequency] [pattern]",
    category: "Advanced Features",
  },
  {
    title: "Keyring",
    description: "Manages secrets.",
    command: "termux-keyring [options]",
    category: "Advanced Features",
  },
  {
    title: "Share Content",
    description: "Shares via Android menu.",
    command: "termux-share",
    category: "Advanced Features",
  },
  {
    title: "Show Dialog",
    description: "Displays a dialog box.",
    command: "termux-dialog",
    category: "Advanced Features",
  },
  {
    title: "Open with App",
    description: "Opens link with default app.",
    command: "termux-url-opener [URL]",
    category: "Advanced Features",
  },
  {
    title: "Set Wallpaper",
    description: "Changes device wallpaper.",
    command: "termux-wallpaper [file]",
    category: "Advanced Features",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Audio & Microphone": <Mic className="w-5 h-5" />,
  "Call & SMS": <MessageSquare className="w-5 h-5" />,
  "Camera & Media": <Camera className="w-5 h-5" />,
  "Clipboard & Contacts": <Copy className="w-5 h-5" />,
  "Network & Connectivity": <Wifi className="w-5 h-5" />,
  "Files & Editor": <Copy className="w-5 h-5" />,
  "System & Notifications": <Volume2 className="w-5 h-5" />,
  "Advanced Features": <Radio className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Audio & Microphone": "from-purple-500 to-pink-600",
  "Call & SMS": "from-green-500 to-emerald-600",
  "Camera & Media": "from-yellow-500 to-orange-600",
  "Clipboard & Contacts": "from-blue-500 to-cyan-600",
  "Network & Connectivity": "from-indigo-500 to-purple-600",
  "Files & Editor": "from-orange-500 to-red-600",
  "System & Notifications": "from-red-500 to-pink-600",
  "Advanced Features": "from-teal-500 to-blue-600",
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

export default function Lesson2Page(): JSX.Element {
  const categories = Array.from(new Set(lesson2Commands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">LESSON 2</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Intermediate Commands
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Explore advanced Termux features including audio, multimedia, networking, and device control for more complex operations.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = lesson2Commands.filter((cmd) => cmd.category === category);
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
            <li>• Some commands require specific permissions - check device settings</li>
            <li>• Use <code className="bg-background px-2 py-1 rounded text-primary font-mono">termux-camera-info</code> before taking photos to verify camera availability</li>
            <li>• SMS and call commands require appropriate Android permissions</li>
            <li>• Network commands may need Wi-Fi or cellular service enabled</li>
            <li>• Always test with sample data before using commands in production scripts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
