"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTranslate from "@/hooks/use-translate";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onSearch: (query: string) => void;
  className?: string;
}

function BlogSearch({ onSearch, className }: Props) {
  const t = useTranslate();
  const [value, setValue] = useState("");

  // debounce — avoids filtering on every single keystroke
  useEffect(() => {
    const timeout = setTimeout(() => onSearch(value.trim()), 300);
    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  const hasValue = value.length > 0;

  return (
    <div className={cn("group relative w-full max-w-md", className)}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("searchBlogsPlaceholder")}
        className={cn(
          "h-12 rounded-full border-white/10 bg-white/5 pl-6 pr-12 text-sm backdrop-blur-md transition-all duration-300",
          "placeholder:text-muted-foreground/70",
          "hover:border-white/20",
          "focus-visible:border-gold/40 focus-visible:bg-white/[0.07] focus-visible:ring-1 focus-visible:ring-gold/40 focus-visible:ring-offset-0",
        )}
      />

      {/* right slot — single fixed position, icon and button cross-fade in place */}
      <div className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center">
        {/* static search icon — visible while input is empty */}
        <Search
          className={cn(
            "pointer-events-none absolute size-4 text-muted-foreground transition-all duration-300",
            hasValue ? "scale-50 opacity-0" : "scale-100 opacity-100",
          )}
        />

        {/* clear button — fades/scales in once the user starts typing */}
        <Button
          type="button"
          size="icon"
          onClick={() => setValue("")}
          aria-label={t("clearSearch")}
          tabIndex={hasValue ? 0 : -1}
          className={cn(
            "size-8 rounded-full border border-white/20 bg-gradient-to-br from-gold/80 to-gold text-gold-foreground shadow-[0_4px_14px_hsl(var(--gold)/0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_hsl(var(--gold)/0.5)]",
            hasValue
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-50 opacity-0",
          )}>
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default BlogSearch;
