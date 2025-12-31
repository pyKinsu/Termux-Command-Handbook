import { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";

import { Navbar, Footer } from "@/components/layout";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";

import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "Termux Handbook",
  description:
    "Master Termux on Android with practical command references, automation tips, and hacking techniques.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          "min-h-screen flex flex-col overflow-x-hidden bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {/* Sticky Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-grow px-2 sm:px-4 py-8">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
