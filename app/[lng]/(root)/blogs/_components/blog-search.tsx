"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTranslate from "@/hooks/use-translate";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onSearch: (query: string) => void;
  defaultValue?: string;
  className?: string;
}

function BlogSearch({ onSearch, defaultValue = "", className }: Props) {
  const t = useTranslate();
  const [value, setValue] = useState(defaultValue);

  // debounce — avoids filtering on every single keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value.trim() !== defaultValue) onSearch(value.trim());
    }, 400);
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const hasValue = value.length > 0;

  return (
    <div className={cn("group relative w-full max-w-md", className)}>
      <Search
        className={cn(
          "pointer-events-none absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-muted-foreground transition-colors duration-300",
          hasValue && "text-gold",
        )}
      />
 
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("searchBlogsPlaceholder")}
        className={cn(
          "h-12 rounded-full border-white/10 bg-white/5 pl-11 pr-11 text-sm backdrop-blur-md transition-all duration-300",
          "placeholder:text-muted-foreground/70",
          "hover:border-white/20",
          "focus-visible:border-gold/40 focus-visible:bg-white/[0.07] focus-visible:ring-1 focus-visible:ring-gold/40 focus-visible:ring-offset-0",
        )}
      />
 
      
      {hasValue && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => {
            setValue("");
            onSearch("");
          }}
          aria-label={t("clearSearch")}
          className="absolute right-2 top-1/2 size-8 -translate-y-1/2 rounded-full text-muted-foreground transition-colors duration-300 hover:bg-white/10 hover:text-foreground">
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}

export default BlogSearch;
