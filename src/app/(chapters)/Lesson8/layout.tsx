import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Network Administration",
  description:
    "Connectivity, monitoring, and security auditing commands for Termux networking.",
  path: "/Lesson8",
});

export default function Lesson8Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
