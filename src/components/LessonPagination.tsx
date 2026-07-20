import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { lessonOrder } from "@/lib/constants";

interface LessonPaginationProps {
  /** The current route's path, e.g. "/Lesson3" */
  currentHref: string;
}

export function LessonPagination({ currentHref }: LessonPaginationProps) {
  const index = lessonOrder.findIndex((l) => l.href === currentHref);
  if (index === -1) return null;

  const prev = index > 0 ? lessonOrder[index - 1] : null;
  const next = index < lessonOrder.length - 1 ? lessonOrder[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Lesson pagination"
      className="mx-auto grid max-w-6xl grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-muted-foreground">
              Previous
            </div>
            <div className="truncate text-sm font-bold text-foreground">
              {prev.name}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex items-center justify-end gap-3 rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-primary/50 sm:col-start-2"
        >
          <div className="min-w-0">
            <div className="text-xs font-semibold text-muted-foreground">
              Next
            </div>
            <div className="truncate text-sm font-bold text-foreground">
              {next.name}
            </div>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
