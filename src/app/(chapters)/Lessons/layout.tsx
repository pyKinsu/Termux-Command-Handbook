import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "All Lessons",
  description:
    "Browse every Termux Handbook lesson, from beginner installation guides to advanced system administration and networking commands.",
  path: "/Lessons",
});

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
