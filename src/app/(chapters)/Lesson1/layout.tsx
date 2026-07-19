import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Core Commands",
  description:
    "Essential Termux terminal commands and package management every user needs to know.",
  path: "/Lesson1",
});

export default function Lesson1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
