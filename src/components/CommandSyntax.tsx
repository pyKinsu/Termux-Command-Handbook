import * as React from "react";

interface CommandSyntaxProps {
  command: string;
}

// Splits a command string on bracketed placeholders — [like_this] or
// <like_this> — and renders them in a distinct color/style so it's
// obvious at a glance what's literal shell syntax versus a value the
// user needs to substitute themselves.
export function CommandSyntax({ command }: CommandSyntaxProps) {
  const parts = command.split(/(\[[^\]]+\]|<[^>]+>)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, idx) => {
        const isPlaceholder =
          (part.startsWith("[") && part.endsWith("]")) ||
          (part.startsWith("<") && part.endsWith(">"));

        if (!isPlaceholder) {
          return <React.Fragment key={idx}>{part}</React.Fragment>;
        }

        return (
          <span
            key={idx}
            className="text-amber-600 dark:text-amber-400 italic"
          >
            {part}
          </span>
        );
      })}
    </>
  );
}
