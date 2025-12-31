import React from "react";
import { HelpCircle, Shield, Zap, Github, BookOpen, Users } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQSection {
  title: string;
  icon: React.ElementType;
  color: string;
  questions: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

export function FrequentlyAsked(): JSX.Element {
  const faqSections: FAQSection[] = [
    {
      title: "General Questions",
      icon: HelpCircle,
      color: "from-blue-500 to-cyan-600",
      questions: [
        {
          id: "general-1",
          question: "Is the Termux Handbook free?",
          answer:
            "Yes! This handbook is completely free, open-source, and will always remain that way. No paywalls, no ads, no logins required.",
        },
        {
          id: "general-2",
          question: "Do I need any prior knowledge to use this?",
          answer:
            "Not at all! This guide is designed for complete beginners starting from absolute basics, as well as advanced users looking to deepen their knowledge.",
        },
        {
          id: "general-3",
          question: "Can I use this guide offline?",
          answer:
            "Yes, you can save individual lesson pages for offline use. A downloadable PDF version will be available soon for convenient offline reading.",
        },
        {
          id: "general-4",
          question: "Can I share this with others?",
          answer:
            "Absolutely! Since this is open-source under the MIT License, you're free to share, fork, and distribute it. We encourage sharing with the community!",
        },
      ],
    },
    {
      title: "Technical Questions",
      icon: Zap,
      color: "from-purple-500 to-pink-600",
      questions: [
        {
          id: "tech-1",
          question: "Does this require root access?",
          answer:
            "No, Termux does not require root access. All lessons and commands work on non-rooted devices. Some advanced features may benefit from root, but it's entirely optional.",
        },
        {
          id: "tech-2",
          question: "What devices are supported?",
          answer:
            "Any Android device running Android 5.0+ that can install Termux from F-Droid is supported. The older Play Store version is outdated and not recommended.",
        },
        {
          id: "tech-3",
          question: "Will these commands work in other terminals?",
          answer:
            "Most commands will work in any Linux shell (Ubuntu, Debian, etc.), but some are Termux-specific. Each lesson notes if a command is Termux-exclusive.",
        },
        {
          id: "tech-4",
          question: "Which Android version is recommended?",
          answer:
            "Android 7.0+ is recommended for best performance. Older versions may work but with limited features. We support Android 5.0 and above.",
        },
      ],
    },
    {
      title: "Contributing & Community",
      icon: Github,
      color: "from-green-500 to-emerald-600",
      questions: [
        {
          id: "contrib-1",
          question: "How can I contribute to this project?",
          answer:
            "You can contribute by opening issues for bugs/suggestions, submitting pull requests with improvements, or helping improve existing lessons. Visit our GitHub repository to get started.",
        },
        {
          id: "contrib-2",
          question: "Can I report bugs or suggest features?",
          answer:
            "Yes! Please open an issue on our GitHub repository. We welcome all feedback, bug reports, and feature requests from the community.",
        },
        {
          id: "contrib-3",
          question: "Is there a code of conduct?",
          answer:
            "We follow a standard code of conduct to ensure our community remains respectful and inclusive. All contributors are expected to adhere to these guidelines.",
        },
      ],
    },
    {
      title: "Learning & Content",
      icon: BookOpen,
      color: "from-yellow-500 to-orange-600",
      questions: [
        {
          id: "learn-1",
          question: "What's the best way to learn from this guide?",
          answer:
            "Start with Lesson 1 (Basics) and progress sequentially. Each lesson builds on the previous one. Type out the commands yourself rather than just reading them for better learning.",
        },
        {
          id: "learn-2",
          question: "How long will it take to complete all lessons?",
          answer:
            "This depends on your pace and experience level. Beginners might take 10-20 hours, while advanced users can skim relevant sections. Work at your own pace!",
        },
        {
          id: "learn-3",
          question: "Can I skip lessons?",
          answer:
            "While lessons build on each other, you can skip ahead if you already have foundational knowledge. However, starting from the basics is recommended for the best learning experience.",
        },
        {
          id: "learn-4",
          question: "Are there practice exercises?",
          answer:
            "Each lesson includes practical command examples you can try. We recommend experimenting with commands in Termux to reinforce your learning. A dedicated practice section is coming soon!",
        },
      ],
    },
  ];

  return (
    <section id="faq" className="w-full scroll-mt-12 py-12 sm:py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center mb-12 sm:mb-16 md:mb-20">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">
                Help & Support
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-foreground">
              Frequently Asked <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
              Find answers to common questions about the Termux Handbook, technical details, and how to get the most out of this learning resource.
            </p>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {faqSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-primary/50 transition-all duration-300"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {section.title}
                  </h3>
                </div>

                {/* Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((item, idx) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className={idx !== section.questions.length - 1 ? "border-b border-border" : ""}
                    >
                      <AccordionTrigger className="py-4 text-left font-semibold text-foreground hover:text-primary hover:no-underline transition-colors text-sm sm:text-base">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 text-start text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>

        {/* Additional CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20 p-6 sm:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm text-center">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Join our community or check our GitHub repository for more information and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="https://github.com/pyKinsu/Termux-Command-Handbook/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:bg-muted transition font-semibold text-sm sm:text-base"
            >
              <Users className="w-4 h-4" />
              Join Discussions
            </a>
            <a
              href="https://github.com/pyKinsu/Termux-Command-Handbook/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:bg-muted transition font-semibold text-sm sm:text-base"
            >
              <HelpCircle className="w-4 h-4" />
              Report Issue
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
