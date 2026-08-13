"use client";

import { IBlog } from "@/types";
import BlogCard from "@/components/cards/blog.card";
import FeaturedPost from "./featured-post";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'

interface Props {
  blogs: IBlog[];
}

function BlogsExplorer({ blogs }: Props) {
  const t = useTranslate();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const [featured, ...rest] = blogs;

  const categories = useMemo(() => {
    const unique = new Map<string, string>();
    rest.forEach((b) => unique.set(b.category.slug, b.category.name));
    return Array.from(unique, ([slug, name]) => ({ slug, name }));
  }, [rest]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return rest;
    return rest.filter((b) => b.category.slug === activeCategory);
  }, [rest, activeCategory]);

  return (
    <div className="container mx-auto max-w-6xl">
      {featured && <FeaturedPost blog={featured} />}

      <div className="mt-12 flex flex-wrap gap-2">
        <Button
          onClick={() => setActiveCategory("all")}
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
            onClick={() => setActiveCategory(cat.slug)}
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

      <div className="mt-8 grid grid-cols-2 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {filtered.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          Bu kategoriyada hozircha maqola yo&apos;q.
        </p>
      )}
    </div>
  );
}

export default BlogsExplorer;