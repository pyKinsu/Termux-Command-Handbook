import { Puzzle } from "lucide-react";

import { requiresTermuxApi } from "@/lib/utils";

interface TermuxApiBadgeProps {
  command: string;
}

// Shows a small badge on any command that comes from the Termux:API
// add-on app rather than base Termux, since running it without that
// app + `pkg install termux-api` installed just fails with "command
// not found" and gives no clue why.
export function TermuxApiBadge({ command }: TermuxApiBadgeProps) {
  if (!requiresTermuxApi(command)) return null;

  return (
    <span
      className="inline-flex w-fit items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400"
      title="Requires the Termux:API app and the termux-api package"
    >
      <Puzzle className="h-3 w-3" />
      Requires termux-api
    </span>
  );
}
