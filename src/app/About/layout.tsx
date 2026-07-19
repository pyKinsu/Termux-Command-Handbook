import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "About Termux Handbook — a free, open-source, categorized guide to Termux commands built for Android developers and Linux enthusiasts.",
  path: "/About",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
