import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Termux Basics",
  description:
    "Learn the fundamental Termux concepts every beginner needs: navigating the shell, managing files, and understanding core commands.",
  path: "/Basics",
});

export default function BasicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
