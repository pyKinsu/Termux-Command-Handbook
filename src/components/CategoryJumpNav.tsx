"use client";

import * as React from "react";

import { cn, slugify } from "@/lib/utils";

interface CategoryJumpNavProps {
  categories: string[];
}

export function CategoryJumpNav({ categories }: CategoryJumpNavProps) {
  const [active, setActive] = React.useState(categories[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const category = categories.find(
            (c) => slugify(c) === visible.target.id
          );
          if (category) setActive(category);
        }
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 }
    );

    categories.forEach((category) => {
      const el = document.getElementById(slugify(category));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  if (categories.length < 2) return null;

  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/90 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
      <nav
        aria-label="Jump to category"
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto scrollbar-none"
      >
        {categories.map((category) => (
          <a
            key={category}
            href={`#${slugify(category)}`}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
              active === category
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </a>
        ))}
      </nav>
    </div>
  );
}
