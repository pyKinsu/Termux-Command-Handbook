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

// Commands provided by the separate Termux:API companion app, rather
// than the base Termux:Tools already bundled with the terminal. Anyone
// running one of these without the Termux:API app + `pkg install
// termux-api` installed will just get "command not found", so the UI
// flags them with a badge.
//
// Rather than an exhaustive allow-list, we treat every `termux-*`
// command as an API command except this small set that ships with
// base Termux itself (sourced from termux/termux-tools).
const CORE_TERMUX_COMMANDS = new Set([
  "termux-setup-storage",
  "termux-reload-settings",
  "termux-change-repo",
  "termux-chroot",
  "termux-info",
  "termux-fix-shebang",
  "termux-elf-cleaner",
  "termux-wake-lock",
  "termux-wake-unlock",
  "termux-create-package",
]);

// Returns true if the given command string invokes a Termux:API command
// (extracts the first whitespace-separated token, so flags/arguments
// after the command don't matter).
export const requiresTermuxApi = (command: string) => {
  const base = command.trim().split(/\s+/)[0];
  return base.startsWith("termux-") && !CORE_TERMUX_COMMANDS.has(base);
};
