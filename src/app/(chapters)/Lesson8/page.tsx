"use client";

import { Copy, Check, Network, Globe, Server, BarChart3, Shield } from "lucide-react";
import { useState } from "react";

interface Command {
  command: string;
  description: string;
  category: string;
}

const lesson8Commands: Command[] = [
  // 🌐 Basic Networking
  {
    command: "termux-ping",
    description: "Sends ICMP echo requests to a host.",
    category: "Basic Networking",
  },
  {
    command: "termux-nping",
    description: "Sends ICMP echo requests to a host.",
    category: "Basic Networking",
  },
  {
    command: "termux-traceroute",
    description: "Traces the route taken by packets to a destination.",
    category: "Basic Networking",
  },
  {
    command: "termux-dns-lookup",
    description: "Performs DNS lookups.",
    category: "Basic Networking",
  },
  {
    command: "termux-whois",
    description: "Retrieves WHOIS information for a domain.",
    category: "Basic Networking",
  },

  // 🔌 Network Configuration
  {
    command: "termux-ifconfig",
    description: "Displays or configures network interfaces.",
    category: "Network Config",
  },
  {
    command: "termux-ip",
    description: "Displays or configures network interfaces.",
    category: "Network Config",
  },
  {
    command: "termux-hostname",
    description: "Displays or sets the system hostname.",
    category: "Network Config",
  },
  {
    command: "termux-route",
    description: "Displays or modifies the IP routing table.",
    category: "Network Config",
  },
  {
    command: "termux-arp",
    description: "Displays and modifies the ARP cache.",
    category: "Network Config",
  },

  // 📊 Network Monitoring
  {
    command: "termux-netstat",
    description: "Displays network connections, routing tables, etc.",
    category: "Network Monitoring",
  },
  {
    command: "termux-ss",
    description: "Displays socket statistics.",
    category: "Network Monitoring",
  },
  {
    command: "termux-iostat",
    description: "Displays I/O statistics.",
    category: "Network Monitoring",
  },
  {
    command: "termux-df",
    description: "Displays disk usage statistics.",
    category: "Network Monitoring",
  },
  {
    command: "termux-tcpdump",
    description: "Captures and analyzes network packets.",
    category: "Network Monitoring",
  },

  // 🔒 Security & Scanning
  {
    command: "termux-nmap",
    description: "Performs network discovery and security auditing.",
    category: "Security & Scanning",
  },
  {
    command: "termux-sysctl",
    description: "Configures kernel parameters at runtime.",
    category: "Security & Scanning",
  },
  {
    command: "termux-cpulimit",
    description: "Limits CPU usage of a process.",
    category: "Security & Scanning",
  },

  // 🌍 Remote Access & Transfer
  {
    command: "termux-ssh",
    description: "Initiates an SSH session.",
    category: "Remote Access",
  },
  {
    command: "termux-sshfs",
    description: "Mounts a remote filesystem over SSH.",
    category: "Remote Access",
  },
  {
    command: "termux-telnet",
    description: "Initiates a Telnet session.",
    category: "Remote Access",
  },
  {
    command: "termux-ftp",
    description: "Initiates an FTP session.",
    category: "Remote Access",
  },
  {
    command: "termux-wget",
    description: "Retrieves files from the web using HTTP, HTTPS, or FTP.",
    category: "Remote Access",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Basic Networking": <Globe className="w-5 h-5" />,
  "Network Config": <Network className="w-5 h-5" />,
  "Network Monitoring": <BarChart3 className="w-5 h-5" />,
  "Security & Scanning": <Shield className="w-5 h-5" />,
  "Remote Access": <Server className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "Basic Networking": "from-blue-500 to-cyan-600",
  "Network Config": "from-green-500 to-emerald-600",
  "Network Monitoring": "from-purple-500 to-indigo-600",
  "Security & Scanning": "from-red-500 to-pink-600",
  "Remote Access": "from-orange-500 to-yellow-600",
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

export default function Lesson8Page(): JSX.Element {
  const categories = Array.from(new Set(lesson8Commands.map((cmd) => cmd.category)));

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">LESSON 8</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Network Administration
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Master network administration commands for connectivity, monitoring, security auditing, and remote access management.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => {
            const commands = lesson8Commands.filter((cmd) => cmd.category === category);
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
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">💡 Network Admin Tips</h3>
          <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
            <li>• Use ping and traceroute to diagnose network connectivity issues</li>
            <li>• Monitor network connections with netstat and ss for security auditing</li>
            <li>• Configure network interfaces properly for optimal performance</li>
            <li>• Use nmap carefully - ensure you have proper authorization before scanning networks</li>
            <li>• DNS lookups and WHOIS commands help identify network infrastructure</li>
            <li>• SSH and SSHFS provide secure remote access and file transfer</li>
            <li>• tcpdump is powerful for packet analysis and network troubleshooting</li>
            <li>• Combine multiple commands in scripts for comprehensive network monitoring</li>
            <li>• Always follow network policies and ethical guidelines when using admin commands</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
