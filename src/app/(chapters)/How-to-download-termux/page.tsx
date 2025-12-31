"use client";

import { useState } from "react";
import {
  Download,
  ShieldCheck,
  Github,
  ChevronDown,
  ChevronUp,
  Info,
  AlertTriangle,
  Smartphone,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

export default function DownloadTermuxPage(): JSX.Element {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "Why avoid the Play Store version?",
      answer:
        "The Play Store version of Termux is outdated, no longer maintained, and may cause compatibility issues. The official F-Droid version is actively updated and supported by the developers.",
    },
    {
      question: "Is downloading from F-Droid safe?",
      answer:
        "Yes, absolutely. F-Droid is an open-source app store that verifies the authenticity and security of apps through automated scanning. It's the safest and most recommended source for Termux.",
    },
    {
      question: "Do I need root access to use Termux?",
      answer:
        "No, Termux works perfectly on non-rooted Android devices. However, some advanced features and system-level operations may require root access or additional permissions.",
    },
    {
      question: "How do I install the downloaded APK?",
      answer:
        "After downloading, enable 'Install from Unknown Sources' in Settings > Apps > Special App Access. Then open the APK file to install it. Make sure to allow the installation when prompted.",
    },
    {
      question: "Can I update Termux after installation?",
      answer:
        "Yes, Termux checks for updates automatically. You can also manually update packages using 'pkg update' and 'pkg upgrade' commands within Termux.",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Enable Unknown Sources",
      description: "Go to Settings > Apps > Special App Access > Install unknown apps and enable it for your browser.",
      icon: Smartphone,
    },
    {
      number: 2,
      title: "Download APK",
      description: "Click the download button below to get the latest official Termux APK from F-Droid.",
      icon: Download,
    },
    {
      number: 3,
      title: "Install APK",
      description: "Open the downloaded APK file and follow the on-screen prompts to install Termux.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2 text-sm font-semibold text-muted-foreground">GETTING STARTED</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-foreground">
            Install Termux
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Get the latest official Termux APK safely and securely. Avoid outdated versions from the Play Store.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Installation Steps */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Installation Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="relative rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                    <div className="mb-4 mt-2">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Download Options */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Download Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* F-Droid Option */}
              <div className="relative rounded-xl border border-green-500/30 bg-card p-6 sm:p-8 hover:border-green-500/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    Recommended
                  </div>
                </div>

                <div className="mb-6 mt-4">
                  <ShieldCheck className="w-12 h-12 text-green-500" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Official F-Droid Build</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  The safest and most official source. F-Droid verifies authenticity and provides regular security updates.
                </p>

                <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Actively maintained and updated</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Security verified by F-Droid</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Latest version available</span>
                  </div>
                </div>

                <Link
                  href="https://f-droid.org/repo/com.termux_1022.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90 transition font-semibold"
                >
                  <Download className="w-5 h-5" />
                  Download APK
                </Link>
              </div>

              {/* GitHub Option */}
              <div className="relative rounded-xl border border-border bg-card p-6 sm:p-8 hover:border-primary/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">
                    <Github className="w-4 h-4" />
                    Advanced
                  </div>
                </div>

                <div className="mb-6 mt-4">
                  <Github className="w-12 h-12 text-primary" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">GitHub Releases</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Browse all official releases from the GitHub repository. Great for advanced users or testing specific versions.
                </p>

                <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Access all release versions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Official source code</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Release notes and changelogs</span>
                  </div>
                </div>

                <Link
                  href="https://github.com/termux/termux-app/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted transition font-semibold"
                >
                  <Github className="w-5 h-5" />
                  Browse Releases
                </Link>
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <div className="mb-16 sm:mb-20 p-6 border border-yellow-500/30 bg-yellow-500/10 rounded-xl flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Important Warning</h3>
              <p className="text-sm text-yellow-600 dark:text-yellow-300">
                Never install Termux from the Google Play Store. It is outdated, no longer maintained, and may cause compatibility issues with packages and commands. Always use F-Droid or GitHub releases instead.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Info className="w-8 h-8 text-primary" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-xl overflow-hidden bg-card hover:border-primary/50 transition-all duration-300"
                >
                  <button
                    className="w-full flex justify-between items-center px-6 py-4 hover:bg-muted/30 transition text-left font-semibold text-foreground"
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  >
                    <span className="text-base sm:text-lg">{faq.question}</span>
                    {openFAQ === idx ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === idx && (
                    <div className="px-6 py-4 border-t border-border bg-muted/10 text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
