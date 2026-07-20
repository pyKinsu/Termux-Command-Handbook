import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

// Merge classnames intelligently
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Turns a string into a URL-safe, lowercase, hyphenated slug.
// Used to build stable DOM ids for command cards so the search
// palette can deep-link and scroll to a specific command.
export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};
