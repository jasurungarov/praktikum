"use client";

import { IBlogDB } from "@/app.types";
import BlogCard from "@/components/cards/blog.card";
import NoResult from "@/components/shared/no-result";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { blogCategory } from "@/constants";
import useTranslate from "@/hooks/use-translate";
import { cn, formUrlQuery, removeKeysFormQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import BlogSearch from "./blog-search";
import FeaturedPost from "./featured-post";

interface Props {
  result: {
    blogs: IBlogDB[];
    isNext: boolean;
    totalBlogs: number;
  };
  showFeatured: boolean;
  page: number;
}

function BlogsExplorer({ result, showFeatured, page }: Props) {
  const t = useTranslate();
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "all";
  const activeQuery = searchParams.get("q") ?? "";

  const { blogs, isNext, totalBlogs } = result;

  const gridBlogs = showFeatured ? blogs.slice(1) : blogs;
  const featured = showFeatured ? blogs[0] : null;

  const onCategoryChange = useCallback(
    (category: string) => {
      let newUrl: string;

      if (category === "all") {
        newUrl = removeKeysFormQuery({
          params: searchParams.toString(),
          keysToRemove: ["category", "page"],
        });
      } else {
        newUrl = formUrlQuery({
          key: "category",
          value: category,
          params: searchParams.toString(),
        });
        newUrl = formUrlQuery({
          key: "page",
          value: null,
          params: newUrl.split("?")[1] ?? "",
        });
      }

      router.push(newUrl);
    },
    [router, searchParams],
  );

  const onSearch = useCallback(
    (value: string) => {
      let newUrl: string;

      if (!value) {
        newUrl = removeKeysFormQuery({
          params: searchParams.toString(),
          keysToRemove: ["q", "page"],
        });
      } else {
        newUrl = formUrlQuery({
          key: "q",
          value,
          params: searchParams.toString(),
        });
        newUrl = formUrlQuery({
          key: "page",
          value: null,
          params: newUrl.split("?")[1] ?? "",
        });
      }

      router.push(newUrl);
    },
    [router, searchParams],
  );

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="relative mt-6 flex flex-col items-center gap-4">
        <div className="relative flex w-full items-center justify-center gap-4">
          <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-green-500/40 sm:block" />

          <BlogSearch
            onSearch={onSearch}
            defaultValue={activeQuery}
            className="max-w-xl"
          />

          <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-green-500/40 sm:block" />
        </div>
      </div>

      {featured && (
        <div className="mt-10">
          <FeaturedPost blog={featured} />
        </div>
      )}

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
        {blogCategory.map((cat) => (
          <Button
            key={cat.name}
            onClick={() => onCategoryChange(cat.name)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              activeCategory === cat.name
                ? "border-gold/40 bg-primary/80 dark:bg-secondary text-gold"
                : "border-white/10 bg-gold/10 text-muted-foreground hover:border-white/20 hover:text-foreground hover:bg-secondary/20",
            )}>
            {t(cat.label)}
          </Button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
        {gridBlogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>

      {totalBlogs === 0 && (
        <NoResult
          title={t("noBlogsTitle")}
          description={t("noBlogsDescription")}
        />
      )}

      <Pagination pageNumber={page} isNext={isNext} />
    </div>
  );
}

export default BlogsExplorer;
