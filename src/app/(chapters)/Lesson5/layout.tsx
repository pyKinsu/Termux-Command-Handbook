import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Power User Commands",
  description:
    "Specialized Termux commands for app management and hardware control.",
  path: "/Lesson5",
});

export default function Lesson5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
