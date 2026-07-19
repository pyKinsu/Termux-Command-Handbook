import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "System Administration",
  description:
    "Package management, security, and configuration commands for administering Termux.",
  path: "/Lesson7",
});

export default function Lesson7Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
