import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Expert Commands",
  description:
    "Unlock full device integration and API access with expert-level Termux commands.",
  path: "/Lesson4",
});

export default function Lesson4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
