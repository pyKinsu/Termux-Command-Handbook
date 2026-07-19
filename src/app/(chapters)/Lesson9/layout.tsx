import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Data Management",
  description:
    "File operations, text processing, and data manipulation commands in Termux.",
  path: "/Lesson9",
});

export default function Lesson9Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
