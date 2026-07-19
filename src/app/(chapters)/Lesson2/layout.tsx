import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Intermediate Commands",
  description:
    "Audio, SMS, camera, and other advanced Android device features accessible from Termux.",
  path: "/Lesson2",
});

export default function Lesson2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
