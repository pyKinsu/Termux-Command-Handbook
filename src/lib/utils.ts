import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

// Merge classnames intelligently
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
