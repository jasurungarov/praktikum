"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  // builds a compact page list: 1 ... 4 5 6 ... 12
  const getPages = () => {
    const pages: (number | "dots")[] = [];
    const siblings = 1;

    const start = Math.max(2, page - siblings);
    const end = Math.min(totalPages - 1, page + siblings);

    pages.push(1);
    if (start > 2) pages.push("dots");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("dots");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="mt-14 flex items-center justify-center gap-2">
      <Button
        size="icon"
        variant="ghost"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="size-9 text-primary backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-foreground disabled:opacity-40">
        <ChevronLeft className="size-4" />
      </Button>

      {getPages().map((p, idx) =>
        p === "dots" ? (
          <span
            key={`dots-${idx}`}
            className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={p}
            size="icon"
            onClick={() => onChange(p)}
            className={cn(
              "size-9 rounded-full border text-sm font-medium transition-all duration-300",
              p === page
                ? "border-gold/40 bg-gradient-to-br from-gold/80 to-gold text-gold-foreground shadow-[0_4px_14px_hsl(var(--gold)/0.35)]"
                : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/10 hover:text-foreground",
            )}>
            {p}
          </Button>
        ),
      )}

      <Button
        size="icon"
        variant="ghost"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="size-9 text-primary backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-foreground disabled:opacity-40">
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

export default Pagination;
