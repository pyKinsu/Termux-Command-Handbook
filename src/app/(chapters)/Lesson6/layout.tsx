import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Developer Commands",
  description:
    "Clipboard, notifications, and system interaction commands for Termux developers.",
  path: "/Lesson6",
});

export default function Lesson6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
