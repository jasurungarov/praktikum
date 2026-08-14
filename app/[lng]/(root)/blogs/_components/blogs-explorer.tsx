"use client";

import { IBlog } from "@/types";
import BlogCard from "@/components/cards/blog.card";
import FeaturedPost from "./featured-post";
import BlogSearch from "./blog-search";
import Pagination from "./pagination";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'

interface Props {
  blogs: IBlog[];
}

const PAGE_SIZE = 6;

function BlogsExplorer({ blogs }: Props) {
  const t = useTranslate();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const onSearch = useCallback((value: string) => setQuery(value), []);

  const [featured, ...rest] = blogs;

  const categories = useMemo(() => {
    const unique = new Map<string, string>();
    rest.forEach((b) => unique.set(b.category.slug, b.category.name));
    return Array.from(unique, ([slug, name]) => ({ slug, name }));
  }, [rest]);

  const filtered = useMemo(() => {
    let result = rest;

    if (activeCategory !== "all") {
      result = result.filter((b) => b.category.slug === activeCategory);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.category.name.toLowerCase().includes(q) ||
          b.tag.name.toLowerCase().includes(q),
      );
    }

    return result;
  }, [rest, activeCategory, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // whenever the filter/search results change, jump back to page 1
  // so the user isn't stuck on an out-of-range page with no results
  useEffect(() => {
    setPage(1);
  }, [activeCategory, query]);

  const onCategoryChange = (slug: string) => setActiveCategory(slug);

  const onPageChange = (next: number) => {
    setPage(next);
    // scroll back to the top of the grid so pagination feels responsive
    document
      .getElementById("blogs-grid-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="container mx-auto max-w-6xl">
      {featured && <FeaturedPost blog={featured} />}

      <div className="relative mt-6 flex flex-col items-center gap-4">
        <div className="relative flex w-full items-center justify-center gap-4">
          <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-green-500/40 sm:block" />
          <BlogSearch onSearch={onSearch} className="max-w-xl" />
          <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-green-500/40 sm:block" />
        </div>
      </div>

      <div id="blogs-grid-top" className="mt-12 flex flex-wrap gap-2">
        <Button
          onClick={() => onCategoryChange("all")}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
            activeCategory === "all"
              ? "border-gold/40 bg-primary/80 dark:bg-secondary text-gold"
              : "border-white/10 bg-gold/10 text-muted-foreground hover:border-white/20 hover:text-foreground",
          )}>
         {t("level1")}
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.slug}
            onClick={() => onCategoryChange(cat.slug)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              activeCategory === cat.slug
                ? "border-gold/40 bg-primary/80 dark:bg-secondary text-gold"
                : "border-white/10 bg-gold/10 text-muted-foreground hover:border-white/20 hover:text-foreground hover:bg-secondary/20",
            )}
            >
            {cat.name}
          </Button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {paginated.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          {query ? t("noSearchResults") : "Bu kategoriyada hozircha maqola yo'q."}
        </p>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}

export default BlogsExplorer;