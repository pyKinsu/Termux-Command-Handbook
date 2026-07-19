import { Metadata } from "next";

export const SITE_NAME = "Termux Handbook";
export const SITE_URL = "https://termux-handbook.vercel.app";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

/**
 * Builds consistent per-page metadata (title, description, canonical URL,
 * and Open Graph / Twitter tags) for route segments whose page.tsx is a
 * client component and therefore cannot export `metadata` itself.
 *
 * Usage: create a `layout.tsx` alongside the route's `page.tsx` and
 * `export const metadata = buildPageMetadata({ ... })` from it.
 */
export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
