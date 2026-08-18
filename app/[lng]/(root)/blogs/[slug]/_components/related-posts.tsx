"use client";

import { IBlogDB } from '@/app.types'
import useTranslate from '@/hooks/use-translate'
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface Props {
  blogs: IBlogDB[];
}

function RelatedPosts({ blogs }: Props) {
  const t = useTranslate();

  if (!blogs.length) return null;

  return (
    <div className="container mx-auto my-20 max-w-6xl">
      <h2 className="font-space-grotesk text-2xl font-bold">
        {t("relatedArticles")}
      </h2>

      <div className="mt-6 grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/25">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground">
                {format(new Date(blog.createdAt), "MMM dd, yyyy")}
              </p>
              <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold transition-colors group-hover:text-amber-400">
                {blog.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedPosts;
