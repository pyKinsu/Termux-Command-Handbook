import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "How to Download Termux",
  description:
    "Step-by-step guide to safely installing Termux on Android via F-Droid or GitHub. Avoid the outdated, unsupported Play Store version.",
  path: "/How-to-download-termux",
});

export default function DownloadTermuxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
