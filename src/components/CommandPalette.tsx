"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";

import { cn, slugify } from "@/lib/utils";
import { commands, type HandbookCommand } from "@/data/commands";

function scoreMatch(cmd: HandbookCommand, query: string): number {
  const q = query.toLowerCase();
  const title = cmd.title.toLowerCase();
  const command = cmd.command.toLowerCase();
  const description = cmd.description.toLowerCase();

  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (command.startsWith(q)) return 70;
  if (title.includes(q)) return 50;
  if (command.includes(q)) return 40;
  if (description.includes(q)) return 20;
  if (cmd.category.toLowerCase().includes(q)) return 10;
  return 0;
}

const MAX_RESULTS = 8;

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = React.useMemo(() => {
    if (!query.trim()) {
      return commands.slice(0, MAX_RESULTS);
    }
    return commands
      .map((cmd) => ({ cmd, score: scoreMatch(cmd, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((r) => r.cmd);
  }, [query]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isModK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isModK) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const goToCommand = React.useCallback(
    (cmd: HandbookCommand) => {
      setOpen(false);
      setQuery("");
      router.push(`${cmd.lessonSlug}#${cmd.id}`);
    },
    [router]
  );

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = results[activeIndex];
      if (selected) goToCommand(selected);
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          aria-label="Search commands"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search commands…</span>
          <kbd className="hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground sm:flex">
            <span>⌘</span>K
          </kbd>
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-24 z-[101] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <DialogPrimitive.Title className="sr-only">
            Search commands
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search across every Termux command in the handbook
          </DialogPrimitive.Description>

          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search all 300+ commands…"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground sm:block">
              ESC
            </kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No commands match &ldquo;{query}&rdquo;
              </p>
            ) : (
              results.map((cmd, idx) => (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => goToCommand(cmd)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    idx === activeIndex ? "bg-primary/10" : "hover:bg-primary/5"
                  )}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-foreground">
                        {cmd.title}
                      </span>
                      <span className="shrink-0 rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {cmd.lessonTitle}
                      </span>
                    </div>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {cmd.command || cmd.title}
                    </p>
                  </div>
                  {idx === activeIndex && (
                    <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                </button>
              ))
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// Exported so lesson pages can compute the same id used at build time by
// scripts/extract-commands.js when they don't already store one.
export function commandAnchorId(lessonDir: string, title: string) {
  return slugify(`${lessonDir}-${title}`);
}
