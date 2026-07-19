import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Advanced Commands",
  description:
    "Master complex system operations and automation with advanced Termux commands.",
  path: "/Lesson3",
});

export default function Lesson3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
